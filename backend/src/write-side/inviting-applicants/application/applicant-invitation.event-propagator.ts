import { EventBus, EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ApplicantInvitationDomainEvent } from '../domain/applicant-invitation.domain-event';
import { ApplicantInvitationPublicEvent } from '@coders-board-library/public-messages';
import {
  APPLICANT_INVITATION_REPOSITORY,
  ApplicantInvitationRepository,
} from '../domain/applicant-invitation.repository';
import { Inject } from '@nestjs/common';

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

  @EventsHandler(InvitationCancelled)
  class InvitationCancelled
    implements
      IEventHandler<ApplicantInvitationDomainEvent.InvitationCancelled> {
    constructor(
      private readonly eventBus: EventBus,
      @Inject(APPLICANT_INVITATION_REPOSITORY)
      private readonly applicantInvitationRepository: ApplicantInvitationRepository,
    ) {}

    async handle(event: ApplicantInvitationDomainEvent.InvitationCancelled) {
      const {
        aggregateId,
        aggregateType,
        eventId,
        eventType,
        occurredAt,
        payload,
      } = event;
      if (!event.eventId) {
        return;
      }
      const invitation = await this.applicantInvitationRepository.findById(
        aggregateId,
      );
      this.eventBus.publish(
        new ApplicantInvitationPublicEvent.ApplicantInvitationCancelled(
          eventId.raw,
          occurredAt,
          aggregateId.raw,
          {
            personalEmail: invitation.personalEmail.raw, //TODO: Find better way to enhance events without exposing getters
            firstName: invitation.firstName.raw,
            lastName: invitation.lastName.raw,
          },
        ),
      );
    }
  }

  export const All = [ApplicantInvited, InvitationCancelled];
}
