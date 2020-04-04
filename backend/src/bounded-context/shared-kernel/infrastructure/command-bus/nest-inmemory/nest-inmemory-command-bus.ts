import {CommandBus as InMemoryCommandBus} from "@nestjs/cqrs";
import {ExternalCommandBus} from "../../../application/external-command-bus";
import {ExternalCommand} from "../../../presentation/messages/command/external-command";
import {ExternalCommandHandler} from "../../../application/external-command-handler";

export class NestInMemoryCommandBus implements ExternalCommandBus {

    constructor(private readonly inMemoryCommandBus: InMemoryCommandBus) {
    }

    execute<T extends ExternalCommand>(command: T): Promise<any> {
        return this.inMemoryCommandBus.execute(command);
    }

    register(handlers: ExternalCommandHandler<ExternalCommand>[] = []) {
        return this.inMemoryCommandBus.register(handlers);
    }
}
