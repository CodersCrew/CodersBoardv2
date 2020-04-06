import {Module} from "@nestjs/common";
import {InvitingApplicantsFacade} from "./inviting-applicants-facade";
import {InvitingApplicantsInfrastructureModule} from "../infrastructure/inviting-applicants-infrastructure.module";

@Module({
    imports: [InvitingApplicantsInfrastructureModule],
    providers: [InvitingApplicantsFacade],
    exports: [InvitingApplicantsFacade]
})
export class InvitingApplicantsApplicationModule {
}
