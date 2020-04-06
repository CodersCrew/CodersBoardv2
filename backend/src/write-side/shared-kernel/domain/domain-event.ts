import {AggregateId} from './aggregate-id.valueobject';
import {DomainEventId} from './domain-event-id.valueobject';

export interface DomainEvent<I extends AggregateId = AggregateId, T = any> {
    readonly eventId: DomainEventId;
    readonly occurredAt: Date;
    readonly eventType: string;
    readonly aggregateId: I;
    readonly aggregateType: string;
    readonly payload: T;
}
