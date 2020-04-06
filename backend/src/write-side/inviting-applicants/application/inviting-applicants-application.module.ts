import {Module} from "@nestjs/common";
import {InvitingApplicantsFacade} from "./inviting-applicants-facade";

@Module({
    imports: [],
    providers: [InvitingApplicantsFacade],
    exports: [InvitingApplicantsFacade]
})
export class InvitingApplicantsApplicationModule {

}
