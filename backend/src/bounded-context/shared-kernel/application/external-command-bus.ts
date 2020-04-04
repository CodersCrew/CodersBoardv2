import {ExternalCommand} from "../presentation/messages/command/external-command";
import {ExternalCommandHandler} from "./external-command-handler";

export interface ExternalCommandBus {
    execute<T extends ExternalCommand>(command: T): Promise<any>;

    register(handlers: ExternalCommandHandler<ExternalCommand>[]);
}
