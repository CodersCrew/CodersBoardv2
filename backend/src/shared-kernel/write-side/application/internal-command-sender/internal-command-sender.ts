import {InternalCommand} from "./internal-command";

export const INTERNAL_COMMAND_SENDER = Symbol('INTERNAL_COMMAND_SENDER');

export interface InternalCommandSender {
  send<T extends InternalCommand>(command: T): Promise<any>;
}