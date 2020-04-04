import {ExternalCommand} from "../presentation/messages/command/external-command";

export interface ExternalCommandHandler<T extends ExternalCommand = any> {
    execute(command: T): Promise<any>;
}
