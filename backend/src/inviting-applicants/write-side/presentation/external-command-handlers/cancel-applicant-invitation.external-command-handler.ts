import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ApplicantInvitationPublicCommand} from "@coders-board-library/public-messages";
import {Inject} from "@nestjs/common";
import {
  INTERNAL_COMMAND_SENDER,
  InternalCommandSender
} from "../../../../shared-kernel/write-side/application/internal-command-sender/internal-command-sender";
import {CancelApplicantInvitation} from "../../application/internal-command/cancel-applicant-invitation.internal-command";

@CommandHandler(
    ApplicantInvitationPublicCommand.CancelApplicantInvitationCommand,
)
export class CancelApplicantInvitationExternalCommandHandler
    implements ICommandHandler<ApplicantInvitationPublicCommand.CancelApplicantInvitationCommand> {
  constructor(
      @Inject(INTERNAL_COMMAND_SENDER)
      private readonly internalCommandSender: InternalCommandSender,
  ) {
  }

  async execute({
                  applicantInvitationId,
                }: ApplicantInvitationPublicCommand.CancelApplicantInvitationCommand) {
    return this.internalCommandSender.sendAndWait(
        new CancelApplicantInvitation(
            applicantInvitationId,
        ),
    );
  }
}