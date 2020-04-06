import {Module} from "@nestjs/common";
import {ApplicantInvitationEventSourcedRepository} from "./applicant-invitation.event-sourced-repository";
import {SharedKernelInfrastructureModule} from "../../shared-kernel/infrastructure/shared-kernel-infrastructure.module";

@Module({
    imports: [SharedKernelInfrastructureModule],
    providers: [ApplicantInvitationEventSourcedRepository],
    exports: [ApplicantInvitationEventSourcedRepository]
})
export class InvitingApplicantsInfrastructureModule {

}
