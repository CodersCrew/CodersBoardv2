import {EventStorage} from '../event-storage';
import {TimeProvider} from '../../../bounded-context/shared-kernel/domain/time.provider';
import * as moment from 'moment';
import {Inject, Injectable} from '@nestjs/common';
import {EventStreamVersion} from '../event-stream-version.valueobject';
import {InjectRepository} from '@nestjs/typeorm';
import {DomainEventEntity} from './event.typeorm-entity';
import {Repository} from 'src/libraries/event-storage/typeorm';
import {StorageDomainEventEntry} from "../../../bounded-context/shared-kernel/infrastructure/event-sourcing/storage-domain-event-entry";

@Injectable()
export class TypeOrmEventStorage implements EventStorage {

    constructor(
        @Inject(TimeProvider) private readonly timeProvider: TimeProvider,
        @InjectRepository(DomainEventEntity) private readonly typeOrmRepository: Repository<DomainEventEntity>) {
    }

    async store(event: StorageDomainEventEntry, expectedVersion?: EventStreamVersion): Promise<void> {
        const aggregateEvents = await this.typeOrmRepository.count({where: {aggregateId: event.aggregateId}});
        if (expectedVersion && expectedVersion.raw !== aggregateEvents) {
            throw new Error(`Event stream for aggregate was modified! Expected version: ${expectedVersion.raw}, but actual is: ${aggregateEvents}`);
        }
        const nextEventOrder = aggregateEvents + 1;
        const typeOrmDomainEvent = DomainEventEntity.fromProps({...event, order: nextEventOrder});
        return this.typeOrmRepository.save(typeOrmDomainEvent).then();
    }

    //TODO: Check if events are from one stream!
    async storeAll(events: StorageDomainEventEntry[]): Promise<void> {
        const aggregateEvents = await this.typeOrmRepository.count({where: {aggregateId: events[0].aggregateId}});
        const nextEventOrder = aggregateEvents + 1;
        const typeOrmEvents = events.map((e, i) => DomainEventEntity.fromProps({...e, order: nextEventOrder + i}));
        return this.typeOrmRepository.save(typeOrmEvents).then();
    }

    readEvents(aggregateId: string, toDate?: Date) {
        const maxEventDate = toDate ? toDate : this.timeProvider.currentDate();
        return this.typeOrmRepository.find({where: {aggregateId}}) // TODO: Query with occurredAt
            .then(found => found.filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate))));
    }

}
