import {AbstractPublicEvent} from '@coders-board-library/public-messages/shared/event/public-event';

export namespace ApplicantInvitationPublicEvent {
  export abstract class ApplicantInvitationAbstractPublicEvent<P extends any = any> extends AbstractPublicEvent<P> {
    constructor(
        eventId: string,
        occurredAt: Date,
        aggregateId: string,
        data: P,
    ) {
      super(eventId, occurredAt, aggregateId, data);
    }

    get aggregateType(): string {
      return 'ApplicantInvitation';
    }
  }

  export type ApplicantInvitedData = {
    personalEmail: string;
    firstName: string;
    lastName: string;
  };

  export class ApplicantInvitedPublicEvent extends ApplicantInvitationAbstractPublicEvent<ApplicantInvitedData> {
    constructor(
        eventId: string,
        occurredAt: Date,
        aggregateId: string,
        data: ApplicantInvitationPublicEvent.ApplicantInvitedData,
    ) {
      super(eventId, occurredAt, aggregateId, data);
    }
  }

  export class ApplicantInvitationCancelledPublicEvent extends ApplicantInvitationAbstractPublicEvent<{}> {
    constructor(
        eventId: string,
        occurredAt: Date,
        aggregateId: string,
        data: {},
    ) {
      super(eventId, occurredAt, aggregateId, data);
    }
  }
}
