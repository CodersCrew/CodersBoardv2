import {ExternalCommand} from "../presentation/messages/command/external-command";
import {Type} from "@nestjs/common";
import {ExternalCommandHandler} from "./external-command-handler";

export type ExternalCommandHandlerType = Type<ExternalCommandHandler<ExternalCommand>>;

export interface ExternalCommandBus {
    execute<T extends ExternalCommand>(command: T): Promise<any>;

    register(handlers: ExternalCommandHandlerType[]);
}
