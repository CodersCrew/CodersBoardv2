import {Injectable} from "@nestjs/common";
import {CommandBus, CommandHandlerType, EventBus, EventHandlerType} from "@nestjs/cqrs";

@Injectable()
export class InMemoryTransport {

    constructor(private readonly eventBus: EventBus, private readonly  commandBus: CommandBus) {
    }

    publishCommand(command: any): Promise<any> {
        return this.commandBus.execute(command);
    }

    registerCommandHandlers(handlers: CommandHandlerType[]): void {
        return this.commandBus.register(handlers);
    }

    publishEvent(event: any): void {
        return this.eventBus.publish(event);
    }

    registerEventHandlers(handlers: EventHandlerType[] = []): void {
        return this.eventBus.register(handlers);
    }


}
