import { IsDefined, IsNotEmpty } from 'class-validator';

export class InviteApplicantResponseBody {
  @IsDefined()
  @IsNotEmpty()
  readonly invitationId: string;

  constructor(invitationId: string) {
    this.invitationId = invitationId;
  }
}
