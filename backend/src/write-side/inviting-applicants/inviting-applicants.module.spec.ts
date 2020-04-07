import {Test, TestingModule} from "@nestjs/testing";
import {InvitingApplicantsFacade} from "./application/inviting-applicants-facade";
import {InvitingApplicantsModule} from "./inviting-applicants.module";
import {ApplicantInvitationCommand} from "@coders-board-public-messages/public-messages/inviting-applicants/command/applicant-invitation.command";
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import {EventBus} from "@nestjs/cqrs";

const EventAppender = {
    events: [],
    publishAll(events) {
        this.events.push(events)
    },
    publish(event) {
        this.events.push(event)
    },
    isPublished(eventType: any) {
        return this.events.findIndex(e => e.eventType === eventType)
    }
};

describe('Feature: Inviting applicants', () => {
    let sut: InvitingApplicantsFacade;
    let eventBus: EventBus;
    const eventAppender = EventAppender;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            imports: [InvitingApplicantsModule],
        }).compile();
        await app.init();
        sut = app.get<InvitingApplicantsFacade>(InvitingApplicantsFacade);
        eventBus = app.get<EventBus>(EventBus);
        eventBus.publishAll = eventAppender.publishAll;
        eventBus.publish = eventAppender.publish;
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
                expect(this.eventAppender.isPublished("ApplicantInvited")).toBeTruthy();
            });

        })
    });
});
