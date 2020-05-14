import {EventsHandler, IEventHandler} from '@nestjs/cqrs';
import {ApplicantInvitationPublicEvent} from '@coders-board-library/public-messages';
import {
  APPLICANT_INVITATION_REPOSITORY,
  ApplicantInvitationRepository,
} from '../domain/applicant-invitation.repository';
import {Inject} from '@nestjs/common';
import {
  EXTERNAL_EVENT_PUBLISHER,
  ExternalEventPublisher,
} from '../../../shared-kernel/write-side/application/external-event-publisher/external-event-publisher';
import {ApplicantInvited} from "../domain/event/applicant-invited.domain-event";
import {InvitationCancelled} from "../domain/event/invitation-cancelled.domain-events";

/**
 * Each domain event which should be available for read-models and other context on the write-side need
 * to be mapped to public event.
 *
 * TODO: Event propagators need something like Outbox to make possible retries and rebuilding write-side by querying.
 */
@EventsHandler(ApplicantInvited)
class ApplicantInvitedEventPropagator
    implements IEventHandler<ApplicantInvited> {
  constructor(
      @Inject(EXTERNAL_EVENT_PUBLISHER)
      private readonly externalEventPublisher: ExternalEventPublisher,
  ) {
  }

  handle(event: ApplicantInvited) {
    //TODO: Saving in outbox and publishing after in batches
    return this.externalEventPublisher.publish(
        new ApplicantInvitationPublicEvent.ApplicantInvitedPublicEvent(
            event.eventId.raw,
            event.occurredAt,
            event.aggregateId.raw,
            {
              personalEmail: event.data.personalEmail.raw,
              firstName: event.data.firstName.raw,
              lastName: event.data.lastName.raw,
            },
        ),
    );
  }
}

@EventsHandler(InvitationCancelled)
class InvitationCancelledEventPropagator
    implements IEventHandler<InvitationCancelled> {
  constructor(
      @Inject(EXTERNAL_EVENT_PUBLISHER)
      private readonly externalEventPublisher: ExternalEventPublisher
  ) {
  }

  async handle(event: InvitationCancelled) {
    return this.externalEventPublisher.publish(
        new ApplicantInvitationPublicEvent.ApplicantInvitationCancelledPublicEvent(
            event.eventId.raw,
            event.occurredAt,
            event.aggregateId.raw,
            {},
        ),
    );
  }
}

export const All = [ApplicantInvitedEventPropagator, InvitationCancelledEventPropagator];
