import {Inject, Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {ApplicantInvitationCommand} from "../presentation/messages/command/applicant-invitation.command";
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import CancelApplicantInvitation = ApplicantInvitationCommand.CancelApplicantInvitation;
import {TimeProviderPort} from "../../shared-kernel/domain/time-provider.port";
import {ApplicantInvitationRepository} from "../domain/applicant-invitation.repository";
import {ApplicantInvitation} from "../domain/applicant-invitation.aggregate-root";
import {ApplicantInvitationId} from "../domain/applicant-invitation-id.valueobject";
import {PersonalEmail} from "../domain/personal-email.valueobject";
import {FirstName} from "../domain/first-name.value-object";
import {LastName} from "../domain/last-name.value-object";

@Injectable()
export class InvitingApplicantsFacade {

    constructor(
        @Inject("TIME_PROVIDER") private readonly timeProvider: TimeProviderPort,
        @Inject("APPLICANT_INVITATION_REPOSITORY") private readonly repository: ApplicantInvitationRepository
    ) {
    }

    inviteApplicantToAssociation({firstName, lastName, personalEmail}: InviteApplicantToAssociation): Promise<string> {
        const invitation = new ApplicantInvitation(this.timeProvider);
        const id = ApplicantInvitationId.generate();
        invitation.invite(id, {
            personalEmail: PersonalEmail.from(personalEmail),
            firstName: FirstName.from(firstName),
            lastName: LastName.from(lastName)
        });
        return this.repository.save(invitation)
            .then(() => id.raw);
    }

    cancelApplicantInvitation({applicantInvitationId}: CancelApplicantInvitation) {
        return InvitingApplicantsFacade.executeCommand(this.repository, ApplicantInvitationId.of(applicantInvitationId), invitation => invitation.cancel());
    }

    private static executeCommand = async (repository: ApplicantInvitationRepository, targetId: ApplicantInvitationId, command: (target: ApplicantInvitation) => void): Promise<void> => {
        const aggregate = await repository.findById(targetId);
        if (!aggregate) {
            throw new Error(`Applicant invitation with id ${targetId} not found!`);
        }
        command(aggregate);
        return repository.save(aggregate);
    };

}
