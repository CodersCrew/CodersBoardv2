import {Test, TestingModule} from "@nestjs/testing";
import {InvitingApplicantsFacade} from "./application/inviting-applicants-facade";
import {InvitingApplicantsModule} from "./inviting-applicants.module";
import {ApplicantInvitationCommand} from "./presentation/messages/command/applicant-invitation.command";
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;

describe('Feature: Inviting applicants', () => {
    let sut: InvitingApplicantsFacade;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [InvitingApplicantsModule],
        }).compile();

        sut = app.get<InvitingApplicantsFacade>(InvitingApplicantsFacade);
    });

    describe('Given: Applicant to invite', () => {

        const command = new InviteApplicantToAssociation("email@email.com", "Jan", "Kowalski");

        describe('When: Invite the applicant', () => {
            it('Then: Applicant should be invited', () => {
                expect(sut.inviteApplicantToAssociation(command)).toBe('Hello World!');
            });
        })
    });
});
