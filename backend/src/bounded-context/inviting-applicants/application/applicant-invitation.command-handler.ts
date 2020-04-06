import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ApplicantInvitationCommand} from "../presentation/messages/command/applicant-invitation.command";
import {ApplicantInvitationRepository} from "../domain/applicant-invitation.repository";
import {TimeProviderPort} from "../../shared-kernel/domain/time-provider.port";
import {ApplicantInvitationId} from "../domain/applicant-invitation-id.valueobject";
import {ApplicantInvitation} from "../domain/applicant-invitation.aggregate-root";
import {PersonalEmail} from "../domain/personal-email.valueobject";
import {FirstName} from "../domain/first-name.value-object";
import {LastName} from "../domain/last-name.value-object";

export namespace ApplicantInvitationCommandHandler {


    @CommandHandler(ApplicantInvitationCommand.InviteApplicantToAssociation)
    export class InviteApplicantToAssociation implements ICommandHandler<ApplicantInvitationCommand.InviteApplicantToAssociation> {

        constructor(private readonly repository: ApplicantInvitationRepository, private readonly timeProvider: TimeProviderPort) {
        }

        execute(command: ApplicantInvitationCommand.InviteApplicantToAssociation): Promise<ApplicantInvitationId> {
            const applicantInvitation = new ApplicantInvitation(this.timeProvider);
            const applicantInvitationId = ApplicantInvitationId.generate();
            applicantInvitation.invite(applicantInvitationId, {
                personalEmail: PersonalEmail.from(command.personalEmail),
                firstName: FirstName.from(command.firstName),
                lastName: LastName.from(command.lastName)
            });
            return this.repository.save(applicantInvitation)
                .then(() => applicantInvitationId);
        }


    }

    @CommandHandler(ApplicantInvitationCommand.CancelApplicantInvitation)
    export class CancelApplicantInvitation implements ICommandHandler<ApplicantInvitationCommand.CancelApplicantInvitation> {

        constructor(private readonly repository: ApplicantInvitationRepository) {
        }

        execute(command: ApplicantInvitationCommand.CancelApplicantInvitation) {
            return executeCommand(
                this.repository,
                ApplicantInvitationId.of(command.applicantInvitationId),
                applicantInvitation => applicantInvitation.cancel(),
            );
        }


    }


    const executeCommand = async (repository: ApplicantInvitationRepository, targetId: ApplicantInvitationId, command: (target: ApplicantInvitation) => void): Promise<void> => {
        const aggregate = await repository.findById(targetId);
        if (!aggregate) {
            throw new Error(`Invitation with id ${targetId} not found!`);
        }
        command(aggregate);
        return repository.save(aggregate);
    };

    export const All = [
        InviteApplicantToAssociation,
        CancelApplicantInvitation
    ];

}
