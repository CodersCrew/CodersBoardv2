import { IsDefined, IsEmail, IsNotEmpty } from 'class-validator';

export class InviteApplicantRequestBody {
  @IsDefined()
  @IsNotEmpty()
  @IsEmail()
  readonly personalEmail: string;

  @IsDefined()
  @IsNotEmpty()
  readonly firstName: string;

  @IsDefined()
  @IsNotEmpty()
  readonly lastName: string;

  constructor(personalEmail: string, firstName: string, lastName: string) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.personalEmail = personalEmail;
  }
}
