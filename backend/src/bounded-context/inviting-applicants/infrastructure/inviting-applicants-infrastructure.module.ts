import {Module} from "@nestjs/common";
import {SharedKernelInfrastructureModule} from "../../shared-kernel/infrastructure/shared-kernel-infrastructure.module";

@Module({
    imports: [SharedKernelInfrastructureModule]
})
export class InvitingApplicantsModule {

}
