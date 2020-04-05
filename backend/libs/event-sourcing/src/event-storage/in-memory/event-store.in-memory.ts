import {EventStorage} from '../event-storage';
import {TimeProvider} from '../../../../../src/bounded-context/shared-kernel/domain/time.provider';
import * as moment from 'moment';
import {Inject, Injectable} from '@nestjs/common';
import {EventStreamVersion} from '../../api/event-stream-version.valueobject';
import {StorageEventEntry} from "../../api/storage-event-entry";
import {Time} from "../../time.type";

@Injectable()
export class InMemoryEventStore implements EventStorage {

    private eventStreams: { [key: string]: StorageEventEntry[]; } = {};

    constructor(private readonly time: Time) {
    }

    store(event: StorageEventEntry, expectedVersion?: EventStreamVersion): Promise<void> {
        const foundStream = this.eventStreams[event.aggregateId];
        if (!foundStream) {
            this.eventStreams[event.aggregateId] = [event];
        } else {
            this.eventStreams[event.aggregateId].push(event);
        }
        return Promise.resolve();
    }

    storeAll(events: StorageEventEntry[]): Promise<void> {
        return Promise.all(events.map(it => this.store(it))).then();
    }

    readEvents(aggregateId: string, toDate?: Date) {
        const maxEventDate = toDate ? toDate : this.time();
        const events = this.getEventsBy(aggregateId)
            .filter(it => moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)));
        return Promise.resolve(events);
    }

    private getEventsBy(aggregateId: string): StorageEventEntry[] {
        const foundStream = this.eventStreams[aggregateId];
        return foundStream ? foundStream : [];
    }

}
