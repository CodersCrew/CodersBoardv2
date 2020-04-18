import { PublicEvent } from '@coders-board-library/public-messages/shared/event/public-event';

export namespace ApplicantInvitationPublicEvent {
  abstract class AbstractPublicEvent<P extends any = any>
    implements PublicEvent<P> {
    protected constructor(
      readonly eventId: string,
      readonly occurredAt: Date,
      readonly aggregateId: string,
      readonly payload: P,
    ) {}

    get eventType(): string {
      return Object.getPrototypeOf(this).constructor.name;
    }

    get aggregateType(): string {
      return 'ApplicantInvitation';
    }
  }

  export type ApplicantInvitedPayload = {
    personalEmail: string;
    firstName: string;
    lastName: string;
  };
  export class ApplicantInvited extends AbstractPublicEvent<
    ApplicantInvitedPayload
  > {
    constructor(
      eventId: string,
      occurredAt: Date,
      aggregateId: string,
      payload: ApplicantInvitationPublicEvent.ApplicantInvitedPayload,
    ) {
      super(eventId, occurredAt, aggregateId, payload);
    }
  }

  export type ApplicantInvitationCancelledPayload = {
    personalEmail: string;
    firstName: string;
    lastName: string;
  };
  export class ApplicantInvitationCancelled extends AbstractPublicEvent<
    ApplicantInvitationCancelledPayload
  > {
    constructor(
      eventId: string,
      occurredAt: Date,
      aggregateId: string,
      payload: ApplicantInvitationPublicEvent.ApplicantInvitationCancelledPayload,
    ) {
      super(eventId, occurredAt, aggregateId, payload);
    }
  }
}
