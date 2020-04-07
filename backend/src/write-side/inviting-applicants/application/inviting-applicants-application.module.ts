import {Module} from "@nestjs/common";
import {InvitingApplicantsFacade} from "./inviting-applicants-facade";
import {InvitingApplicantsInfrastructureModule} from "../infrastructure/inviting-applicants-infrastructure.module";
import {ApplicantInvitationCommandHandler} from "./applicant-invitation.command-handler";
import {EventPropagator} from "./applicant-invitation.event-propagator";

@Module({
    imports: [InvitingApplicantsInfrastructureModule],
    providers: [InvitingApplicantsFacade, ...ApplicantInvitationCommandHandler.All, ...EventPropagator.All],
    exports: [InvitingApplicantsFacade]
})
export class InvitingApplicantsApplicationModule {
}
