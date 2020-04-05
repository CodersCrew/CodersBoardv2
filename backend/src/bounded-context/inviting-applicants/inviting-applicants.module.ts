import {Module} from "@nestjs/common";
import {SharedKernelInfrastructureModule} from "../shared-kernel/infrastructure/shared-kernel-infrastructure.module";
import {InvitingApplicantsApplicationModule} from "./application/inviting-applicants-application.module";

@Module({
    imports: [
        InvitingApplicantsApplicationModule,
        SharedKernelInfrastructureModule
    ]
})
export class InvitingApplicantsModule {

}
