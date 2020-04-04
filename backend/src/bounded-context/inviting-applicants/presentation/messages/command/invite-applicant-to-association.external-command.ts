import {ExternalCommand} from "../../../../shared-kernel/presentation/messages/command/external-command";

export class InviteApplicantToAssociation implements ExternalCommand {
    constructor(email: string, firstName: string, lastName: string) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
}
