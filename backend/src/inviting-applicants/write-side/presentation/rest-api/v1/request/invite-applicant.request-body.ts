export class InviteApplicantRequestBody  {
  constructor(
      readonly personalEmail: string,
      readonly firstName: string,
      readonly lastName: string,
  ) {}
}