import {EventStreamVersion} from './event-stream-version.valueobject';
import {StorageDomainEventEntry} from "../../bounded-context/shared-kernel/infrastructure/event-sourcing/storage-domain-event-entry";

export abstract class EventStorage {

    abstract store(event: StorageDomainEventEntry, expectedVersion?: EventStreamVersion): Promise<void>;

    abstract storeAll(events: StorageDomainEventEntry[], expectedVersion?: EventStreamVersion): Promise<void>;

    abstract readEvents(aggregateId: string, toDate?: Date): Promise<StorageDomainEventEntry[]>;

}
