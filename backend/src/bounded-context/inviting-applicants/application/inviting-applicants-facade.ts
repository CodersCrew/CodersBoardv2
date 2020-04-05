import {Injectable} from "@nestjs/common";
import {InviteApplicantToAssociation} from "../presentation/messages/command/invite-applicant-to-association.external-command";
import {CommandBus} from "@nestjs/cqrs";

@Injectable()
export class InvitingApplicantsFacade {

    constructor(private commandBus: CommandBus) {
    }

    execute(command: InviteApplicantToAssociation) {
        return this.commandBus.execute(command);
    }

}
