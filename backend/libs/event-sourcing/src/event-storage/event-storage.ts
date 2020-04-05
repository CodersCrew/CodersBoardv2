import {EventStreamVersion} from '../api/event-stream-version.valueobject';
import {StorageEventEntry} from "../api/storage-event-entry";

export abstract class EventStorage {

    abstract store(event: StorageEventEntry, expectedVersion?: EventStreamVersion): Promise<void>;

    abstract storeAll(events: StorageEventEntry[], expectedVersion?: EventStreamVersion): Promise<void>;

    abstract readEvents(aggregateId: string, toDate?: Date): Promise<StorageEventEntry[]>;

}
