import {Module} from "@nestjs/common";
import {SharedKernelInfrastructureModule} from "./infrastructure/shared-kernel-infrastructure.module";

@Module({
    imports: [SharedKernelInfrastructureModule]
})
export class SharedKernelModule {

}
