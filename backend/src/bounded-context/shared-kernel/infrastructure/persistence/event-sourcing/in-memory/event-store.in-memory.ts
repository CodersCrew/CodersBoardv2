import {EventStorage} from '../event-storage';
import {TimeProvider} from '../../../../domain/time.provider';
import * as moment from 'moment';
import {Inject, Injectable} from '@nestjs/common';
import {EventStreamVersion} from '../event-stream-version.valueobject';
import {StorageDomainEventEntry} from "../storage-domain-event-entry";

@Injectable()
export class InMemoryEventStore implements EventStorage {

    private eventStreams: { [key: string]: StorageDomainEventEntry[]; } = {};

    constructor(@Inject(TimeProvider) private readonly timeProvider: TimeProvider) {
    }

    store(event: StorageDomainEventEntry, expectedVersion?: EventStreamVersion): Promise<void> {
        const foundStream = this.eventStreams[event.aggregateId];
        if (!foundStream) {
            this.eventStreams[event.aggregateId] = [event];
        } else {
            this.eventStreams[event.aggregateId].push(event);
        }
        return Promise.resolve();
    }

    storeAll(events: StorageDomainEventEntry[]): Promise<void> {
        return Promise.all(events.map(it => this.store(it))).then();
    }

    readEvents(aggregateId: string, toDate?: Date) {
        const maxEventDate = toDate ? toDate : this.timeProvider.currentDate();
        const events = this.getEventsBy(aggregateId)
            .filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)));
        return Promise.resolve(events);
    }

    private getEventsBy(aggregateId: string): StorageDomainEventEntry[] {
        const foundStream = this.eventStreams[aggregateId];
        return foundStream ? foundStream : [];
    }

}
