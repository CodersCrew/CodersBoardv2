import {Module} from "@nestjs/common";
import {InvitingApplicantsApplicationModule} from "./application/inviting-applicants-application.module";

@Module({
    imports: [
        InvitingApplicantsApplicationModule
    ]
})
export class InvitingApplicantsModule {

}
