import { Module, OnModuleInit } from '@nestjs/common';
import { InvitingApplicantsApplicationModule } from './application/inviting-applicants-application.module';
import { InvitingApplicantsInfrastructureModule } from './infrastructure/inviting-applicants-infrastructure.module';
import { ApplicantInvitationCommand } from '@coders-board-library/public-messages';
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import { CommandBus } from '@nestjs/cqrs';
import CancelApplicantInvitation = ApplicantInvitationCommand.CancelApplicantInvitation;

@Module({
  imports: [
    InvitingApplicantsApplicationModule,
    InvitingApplicantsInfrastructureModule,
  ],
})
export class InvitingApplicantsModule implements OnModuleInit {
  constructor(private readonly commandBus: CommandBus) {}

  //FIXME: Delete. Just to init some data.
  onModuleInit(): any {
    const person = {
      janKowalski: {
        personalEmail: 'jan.kowalski@gmail.com',
        firstName: 'Jan',
        lastName: 'Kowalski',
      },
    };
    const inviteCommand = new InviteApplicantToAssociation(
      person.janKowalski.personalEmail,
      person.janKowalski.firstName,
      person.janKowalski.lastName,
    );
    this.commandBus
      .execute(inviteCommand)
      .then(r =>
          setTimeout(()=>{
            this.commandBus
                .execute(new CancelApplicantInvitation(r)).then()
          },2000)
      );
  }
}
