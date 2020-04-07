import { AbstractAggregateRoot } from '../../shared-kernel/domain/abstract-aggregate-root';
import { ApplicantInvitationId } from './applicant-invitation-id.valueobject';
import { TimeProviderPort } from '../../shared-kernel/domain/time-provider.port';
import { PersonalEmail } from './personal-email.valueobject';
import { FirstName } from './first-name.value-object';
import { LastName } from './last-name.value-object';
import { ApplicantInvitationDomainEvent } from './applicant-invitation.domain-event';

export class ApplicantInvitation extends AbstractAggregateRoot<
  ApplicantInvitationId
> {
  status: InvitationStatus;

  constructor(timeProvider: TimeProviderPort) {
    super(timeProvider);
  }

  invite(
    id: ApplicantInvitationId,
    command: {
      personalEmail: PersonalEmail;
      firstName: FirstName;
      lastName: LastName;
    },
  ) {
    if (this.status !== undefined) {
      throw new Error('Applicant already invited!');
    }
    this.apply(
      ApplicantInvitationDomainEvent.ApplicantInvited.newFrom(
        id,
        this.currentDate,
        { ...command },
      ),
    );
  }

  onApplicantInvited(event: ApplicantInvitationDomainEvent.ApplicantInvited) {
    this.id = event.aggregateId;
    this.status = InvitationStatus.INVITED;
  }

  cancel() {
    if (this.status === InvitationStatus.CANCELLED) {
      throw new Error('Applicant invitation already cancelled!');
    }
    this.apply(
      ApplicantInvitationDomainEvent.InvitationCancelled.newFrom(
        this.id,
        this.currentDate,
        {},
      ),
    );
  }

  onInvitationCancelled(
    event: ApplicantInvitationDomainEvent.InvitationCancelled,
  ) {
    this.id = event.aggregateId;
    this.status = InvitationStatus.CANCELLED;
  }
}

enum InvitationStatus {
  INVITED,
  CANCELLED,
}
