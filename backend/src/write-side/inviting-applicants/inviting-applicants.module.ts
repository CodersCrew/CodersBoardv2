import {Module, OnModuleInit} from '@nestjs/common';
import { InvitingApplicantsApplicationModule } from './application/inviting-applicants-application.module';
import { InvitingApplicantsInfrastructureModule } from './infrastructure/inviting-applicants-infrastructure.module';
import {ApplicantInvitationCommand} from "@coders-board-library/public-messages";
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import {CommandBus} from "@nestjs/cqrs";

@Module({
  imports: [
    InvitingApplicantsApplicationModule,
    InvitingApplicantsInfrastructureModule,
  ],
})
export class InvitingApplicantsModule implements OnModuleInit{

  constructor(private readonly commandBus: CommandBus) {
  }
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
    this.commandBus.execute(inviteCommand).then(r => console.log(r));
  }
}
