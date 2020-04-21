import { Test, TestingModule } from '@nestjs/testing';
import { InvitingApplicantsModule } from './inviting-applicants.module';
import { ApplicantInvitationCommand } from '@coders-board-library/public-messages/inviting-applicants/command/applicant-invitation.command';
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import {CommandBus, EventBus} from '@nestjs/cqrs';
import {
  ApplicantInvitationPublicEvent,
} from '@coders-board-library/public-messages';
import ApplicantInvited = ApplicantInvitationPublicEvent.ApplicantInvited;
import {
  EventBusSpy,
  expectOnlyPublishedEvent
} from "@coders-board-library/public-messages/shared/test.utils";

/**
 * Test of InvitingApplicants. In tests of logic we bypass presentation layer.
 * We treat the module as a black-box. The test checks expected output (published event) based on input (command).
 */

//TODO: When communication between components will be more stable we can introduce special DSL to reduce boilerplate in tests
describe('Feature: Inviting applicants', () => {
  let commandBus: CommandBus;
  let eventBusPublishSpy: EventBusSpy;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [InvitingApplicantsModule],
    }).compile();
    await app.init();
    commandBus = app.get<CommandBus>(CommandBus);
    eventBusPublishSpy = eventBusSpy(app);
  });

  describe('Given: Applicant to invite', () => {
    const command = new InviteApplicantToAssociation(
      'email@email.com',
      'Jan',
      'Kowalski',
    );

    describe('When: Invite the applicant', () => {

      beforeEach(async () => {
        await commandBus.execute(command);
      });

      it('Then: Applicant should be invited', () => {

        expectOnlyPublishedEvent(eventBusPublishSpy, {
          type: ApplicantInvited,
          payload: {
            firstName: command.firstName,
            lastName: command.lastName,
            personalEmail: command.personalEmail,
          },
        });

      });

      afterEach(() => {
        eventBusPublishSpy.mockClear();
      });

    });
  });
});

function eventBusSpy(app: TestingModule): EventBusSpy{
  const eventBus = app.get<EventBus>(EventBus);
  return  jest.spyOn(eventBus, 'publish');
}
