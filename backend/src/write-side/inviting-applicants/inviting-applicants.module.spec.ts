import { Test, TestingModule } from '@nestjs/testing';
import { InvitingApplicantsFacade } from './application/inviting-applicants-facade';
import { InvitingApplicantsModule } from './inviting-applicants.module';
import { ApplicantInvitationCommand } from '@coders-board-library/public-messages/inviting-applicants/command/applicant-invitation.command';
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import { EventBus } from '@nestjs/cqrs';
import { ApplicantInvitationPublicEvent } from '@coders-board-library/public-messages';
import ApplicantInvited = ApplicantInvitationPublicEvent.ApplicantInvited;

/**
 * Test of InvitingApplicants. In tests of logic we bypass presentation layer.
 * We treat the module as a black-box. The test checks expected output (published event) based on input (command).
 */
describe('Feature: Inviting applicants', () => {
  let sut: InvitingApplicantsFacade;
  let eventBusPublishSpy;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [InvitingApplicantsModule],
    }).compile();
    await app.init();
    sut = app.get<InvitingApplicantsFacade>(InvitingApplicantsFacade);
    const eventBus = app.get<EventBus>(EventBus);
    eventBusPublishSpy = jest.spyOn(eventBus, 'publish');
  });

  describe('Given: Applicant to invite', () => {
    const command = new InviteApplicantToAssociation(
      'email@email.com',
      'Jan',
      'Kowalski',
    );

    describe('When: Invite the applicant', () => {
      let result;

      beforeEach(async () => {
        result = await sut.inviteApplicantToAssociation(command);
      });

      it('Then: Applicant should be invited', () => {
        expect(result).toBeDefined();
        const publishedEvent = eventBusPublishSpy.mock.calls[0][0];
        expect(publishedEvent.constructor).toBe(ApplicantInvited);
        expect(publishedEvent.payload.personalEmail).toBe(
          command.personalEmail,
        );
        expect(publishedEvent.payload.firstName).toBe(command.firstName);
        expect(publishedEvent.payload.lastName).toBe(command.lastName);
      });

      afterEach(() => {
        eventBusPublishSpy.mockClear();
      });
    });
  });
});
