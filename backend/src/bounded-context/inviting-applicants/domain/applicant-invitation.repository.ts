import {ApplicantInvitation} from "./applicant-invitation.aggregate-root";

export interface ApplicantInvitationRepository {

    save(army: ApplicantInvitation): Promise<void>;

    findById(id: ApplicantInvitation['id']): Promise<ApplicantInvitation | null>;

}
