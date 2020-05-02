import { Entity, Column, PrimaryColumn, Index } from 'typeorm';
import { StorageEventEntry } from '../../api/storage-event-entry';

@Entity({ name: 'eventsourcing_domain_events', orderBy: { occurredAt: 'ASC' } })
@Index(['aggregateId', 'order'], { unique: true })
export class DomainEventEntity implements StorageEventEntry {
  @PrimaryColumn()
  readonly eventId: string;

  @Column()
  readonly eventType: string;

  @Column({ type: 'timestamp' })
  readonly occurredAt: Date;

  @Column()
  readonly aggregateId: string;

  @Column()
  readonly aggregateType: string;

  @Column()
  readonly order: number;

  @Column({ type: 'json' })
  readonly payload: unknown;

  constructor(
    eventId: string,
    eventType: string,
    occurredAt: Date,
    aggregateId: string,
    aggregateType: string,
    order: number,
    payload: unknown,
  ) {
    this.eventId = eventId;
    this.eventType = eventType;
    this.occurredAt = occurredAt;
    this.aggregateId = aggregateId;
    this.order = order;
    this.payload = payload;
    this.aggregateType = aggregateType;
  }

  static fromProps(props: {
    eventId: string;
    eventType: string;
    occurredAt: Date;
    aggregateId: string;
    aggregateType: string;
    order: number;
    payload: unknown;
  }) {
    return new DomainEventEntity(
      props.eventId,
      props.eventType,
      props.occurredAt,
      props.aggregateId,
      props.aggregateType,
      props.order,
      props.payload,
    );
  }
}
