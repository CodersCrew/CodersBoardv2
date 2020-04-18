import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplicantInvitationDomainEvent } from '../domain/applicant-invitation.domain-event';
import { ApplicantInvitationPublicEvent } from '@coders-board-library/public-messages';

/**
 * Each domain event which should be available for read-models and other context on the write-side need
 * to be mapped to public event.
 *
 * TODO: Event propagators need something like Outbox to make possible retries and rebuilding write-side by querying.
 */
export namespace EventPropagator {
  @EventsHandler(ApplicantInvited)
  class ApplicantInvited
    implements IEventHandler<ApplicantInvitationDomainEvent.ApplicantInvited> {
    constructor(private readonly eventBus: EventBus) {}

    handle(event: ApplicantInvitationDomainEvent.ApplicantInvited) {
      //TODO: Saving in outbox and publishing after in batches
      const {
        aggregateId,
        aggregateType,
        eventId,
        eventType,
        occurredAt,
        payload,
      } = event;
      //FIXME: Bug - Event publikuje się 2 razy, raz dane są nie wypełnione. Nie wiem skąd to wynika. Ale pewnie to wina JavaScriptu.
      //Chwała temu kto znajdzie przyczynę. Na razie workaround poniżej
      if (!event.eventId) {
        return;
      }
      this.eventBus.publish(
        new ApplicantInvitationPublicEvent.ApplicantInvited(
          eventId.raw,
          occurredAt,
          aggregateId.raw,
          {
            personalEmail: payload.personalEmail.raw,
            firstName: payload.firstName.raw,
            lastName: payload.lastName.raw,
          },
        ),
      );
    }
  }

  export const All = [ApplicantInvited];
}
