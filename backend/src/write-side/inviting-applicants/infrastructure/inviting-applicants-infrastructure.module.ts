import { Module } from '@nestjs/common';
import { ApplicantInvitationEventSourcedRepository } from './applicant-invitation.event-sourced-repository';
import { SharedKernelInfrastructureModule } from '../../shared-kernel/infrastructure/shared-kernel-infrastructure.module';

@Module({
  imports: [SharedKernelInfrastructureModule],
  providers: [
    {
      provide: 'APPLICANT_INVITATION_REPOSITORY',
      useClass: ApplicantInvitationEventSourcedRepository,
    },
  ],
  exports: [
    'APPLICANT_INVITATION_REPOSITORY',
    SharedKernelInfrastructureModule,
  ],
})
export class InvitingApplicantsInfrastructureModule {}
