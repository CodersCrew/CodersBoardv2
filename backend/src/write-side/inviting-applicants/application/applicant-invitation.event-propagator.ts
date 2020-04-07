/**
 * Each domain event which should be available for read-models and other context on the write-side need to be mapped to public event.
 */
import {EventBus, EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {ApplicantInvitationDomainEvent} from "../domain/applicant-invitation.domain-event";
import {ApplicantInvitationPublicEvent} from "@coders-board-public-messages/public-messages";

export namespace EventPropagator {

    @EventsHandler(ApplicantInvited)
    class ApplicantInvited implements IEventHandler<ApplicantInvitationDomainEvent.ApplicantInvited> {

        constructor(private readonly eventBus: EventBus) {
        }

        handle({aggregateId, aggregateType, eventId, eventType, occurredAt, payload}: ApplicantInvitationDomainEvent.ApplicantInvited) {
            this.eventBus.publish(new ApplicantInvitationPublicEvent.ApplicantInvited(eventId.raw, occurredAt, aggregateId.raw, {
                personalEmail: payload.personalEmail.raw,
                firstName: payload.firstName.raw,
                lastName: payload.lastName.raw
            }))
        }

    }

    export const All = [
        ApplicantInvited
    ]

}
