import {Test, TestingModule} from "@nestjs/testing";
import {InvitingApplicantsFacade} from "./application/inviting-applicants-facade";
import {InvitingApplicantsModule} from "./inviting-applicants.module";
import {ApplicantInvitationCommand} from "./presentation/messages/command/applicant-invitation.command";
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import {EventBus} from "@nestjs/cqrs";

describe('Feature: Inviting applicants', () => {
    let sut: InvitingApplicantsFacade;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [InvitingApplicantsModule],
        }).overrideProvider(EventBus)
            .useValue({
                setModuleRef: jest.fn(),
                register: jest.fn(),
                publish: jest.fn(),
                publishAll: jest.fn(),
                registerSagas: jest.fn()
            })
            .compile();
        await app.init();
        sut = app.get<InvitingApplicantsFacade>(InvitingApplicantsFacade);
    });

    describe('Given: Applicant to invite', () => {

        const command = new InviteApplicantToAssociation("email@email.com", "Jan", "Kowalski");

        describe('When: Invite the applicant', () => {

            let result;

            beforeEach(() => {
                result = sut.inviteApplicantToAssociation(command)
            });

            it('Then: Applicant should be invited', () => {
                expect(result).resolves.toBeDefined();
            });

        })
    });
});
