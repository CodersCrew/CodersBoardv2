import {CommandBus as InMemoryCommandBus} from "@nestjs/cqrs";
import {ExternalCommandBus, ExternalCommandHandlerType} from "../../../application/external-command-bus";
import {ExternalCommand} from "../../../presentation/messages/command/external-command";

export class NestInMemoryCommandBus implements ExternalCommandBus {

    constructor(private readonly inMemoryCommandBus: InMemoryCommandBus) {
    }

    execute<T extends ExternalCommand>(command: T): Promise<any> {
        return this.inMemoryCommandBus.execute(command);
    }

    register(handlers: ExternalCommandHandlerType[] = []) {
        return this.inMemoryCommandBus.register(handlers);
    }
}
