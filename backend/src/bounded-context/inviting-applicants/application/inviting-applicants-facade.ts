import {Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {ApplicantInvitationCommand} from "../presentation/messages/command/applicant-invitation.command";
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import CancelApplicantInvitation = ApplicantInvitationCommand.CancelApplicantInvitation;

@Injectable()
export class InvitingApplicantsFacade {

    constructor(private commandBus: CommandBus) {
    }

    inviteApplicantToAssociation(command: InviteApplicantToAssociation) {
        return this.commandBus.execute(command);
    }

    cancelApplicantInvitation(command: CancelApplicantInvitation) {
        return this.commandBus.execute(command);
    }

}
