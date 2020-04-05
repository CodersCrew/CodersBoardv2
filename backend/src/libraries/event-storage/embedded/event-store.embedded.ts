import {EventStorage} from '../event-storage';
import {TimeProvider} from '../../../bounded-context/shared-kernel/domain/time.provider';
import * as moment from 'moment';
import {Inject, Injectable} from '@nestjs/common';
import {StoreDomainEventEntry} from '../star-wars-event-sourcing/write/sharedkernel/infrastructure/store-domain-event-entry';
import {EventStreamVersion} from '../event-stream-version.valueobject';

@Injectable()
export class InMemoryEventStore implements EventStorage {

    private eventStreams: { [key: string]: StoreDomainEventEntry[]; } = {};

    constructor(@Inject(TimeProvider) private readonly timeProvider: TimeProvider) {
    }

    store(event: StoreDomainEventEntry, expectedVersion?: EventStreamVersion): Promise<void> {
        const foundStream = this.eventStreams[event.aggregateId];
        if (!foundStream) {
            this.eventStreams[event.aggregateId] = [event];
        } else {
            this.eventStreams[event.aggregateId].push(event);
        }
        return Promise.resolve();
    }

    storeAll(events: StoreDomainEventEntry[]): Promise<void> {
        return Promise.all(events.map(it => this.store(it))).then();
    }

    readEvents(aggregateId: string, toDate?: Date) {
        const maxEventDate = toDate ? toDate : this.timeProvider.currentDate();
        const events = this.getEventsBy(aggregateId)
            .filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)));
        return Promise.resolve(events);
    }

    private getEventsBy(aggregateId: string): StoreDomainEventEntry[] {
        const foundStream = this.eventStreams[aggregateId];
        return foundStream ? foundStream : [];
    }

}
