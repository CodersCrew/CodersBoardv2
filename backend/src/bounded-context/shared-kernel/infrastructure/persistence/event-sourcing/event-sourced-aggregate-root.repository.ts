import {EventBus} from '@nestjs/cqrs';
import {AbstractAggregateRoot} from "../../../domain/abstract-aggregate-root";
import {AggregateId} from "../../../domain/aggregate-id.valueobject";
import {AggregateRootRepository} from "../../../domain/aggregate-root.repository";
import {DomainEvent} from "../../../domain/domain-event";
import {EventStorage} from "./event-storage";
import {StorageDomainEventEntry} from "./storage-domain-event-entry";

export abstract class EventSourcedAggregateRootRepository<I extends AggregateId, T extends AbstractAggregateRoot<I>> implements AggregateRootRepository<I, T> {

    protected constructor(
        private readonly eventStorage: EventStorage,
        private readonly eventBus: EventBus,
    ) {
    }

    async findById(id: I): Promise<T | null> {
        const events = await this.eventStorage.readEvents(id.raw);
        if (events.length === 0) {
            return Promise.resolve(null);
        }
        const aggregate = this.newAggregate();
        aggregate.loadFromHistory(events.map(this.recreateEventFromStored));
        return Promise.resolve(aggregate);
    }

    protected abstract newAggregate(): T;

    protected abstract recreateEventFromStored(event: StorageDomainEventEntry): DomainEvent;

    save(aggregate: T): Promise<void> {
        const uncommitedEvents = aggregate.getUncommittedEvents()
            .map(it => EventSourcedAggregateRootRepository.toStorageDomainEventEntry(it as DomainEvent));
        return this.eventStorage.storeAll(uncommitedEvents)
            .then(() => this.eventBus.publishAll(aggregate.getUncommittedEvents()))
            .then(() => aggregate.clearUncommittedEvents());
    }

    private static toStorageDomainEventEntry(event: DomainEvent): StorageDomainEventEntry {
        return {
            eventId: event.eventId.raw,
            aggregateId: event.aggregateId.raw,
            aggregateType: event.aggregateType,
            occurredAt: event.occurredAt,
            eventType: event.eventType,
            payload: event.payload,
        };
    }

}


