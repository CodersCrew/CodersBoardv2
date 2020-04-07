import { Inject, Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApplicantInvitationCommand } from '@coders-board-public-messages/public-messages/inviting-applicants/command/applicant-invitation.command';
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import CancelApplicantInvitation = ApplicantInvitationCommand.CancelApplicantInvitation;

@Injectable()
export class InvitingApplicantsFacade {
  constructor(private readonly commandBus: CommandBus) {}

  inviteApplicantToAssociation(
    command: InviteApplicantToAssociation,
  ): Promise<string> {
    return this.commandBus.execute(command).then(id => id.raw);
  }

  cancelApplicantInvitation(command: CancelApplicantInvitation) {
    return this.commandBus.execute(command);
  }
}
