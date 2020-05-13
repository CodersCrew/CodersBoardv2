import {Body, Controller, HttpCode, Inject, Post} from '@nestjs/common';
import {InviteApplicantRequestBody} from "./request/invite-applicant.request-body";
import {ApplicantInvitationPublicCommand} from "@coders-board-library/public-messages";
import InviteApplicantToAssociation = ApplicantInvitationPublicCommand.InviteApplicantCommand;
import {
  INTERNAL_COMMAND_SENDER,
  InternalCommandSender
} from "../../../../../shared-kernel/write-side/application/internal-command-sender/internal-command-sender";

@Controller('/rest-api/v1/applicant-invitations')
export class ApplicantInvitationV1WriteSideController {

  //TODO: Consider if introduce Internal Command Sender?
  constructor(@Inject(INTERNAL_COMMAND_SENDER) private readonly commandSender: InternalCommandSender) {
  }

  @HttpCode(201)
  @Post()
  postApplicantInvitation(@Body() body: InviteApplicantRequestBody) {
    return this.commandSender.send(new InviteApplicantToAssociation(body.personalEmail, body.firstName, body.lastName))
  }


}
