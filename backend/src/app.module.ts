import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {NestInMemoryCommandBusModule} from "./bounded-context/shared-kernel/infrastructure/command-bus/nest-inmemory/nest-inmemory-command-bus.module";
import {ExternalCommandHandler} from "./bounded-context/shared-kernel/application/external-command-handler";
import {InviteApplicantToAssociation} from "./bounded-context/inviting-applicants/presentation/messages/command/invite-applicant-to-association.external-command";

class InviteApplicantToAssociationExternalCommandHandler implements ExternalCommandHandler<InviteApplicantToAssociation> {
    async execute(command: InviteApplicantToAssociation): Promise<any> {
        console.log("Super!");
        return "string";
    }
}

const handlers = [new InviteApplicantToAssociationExternalCommandHandler()];

@Module({
    imports: [NestInMemoryCommandBusModule.withHandlers(handlers)],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
