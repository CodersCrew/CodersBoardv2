import { PublicCommand } from '@coders-board-library/public-messages';

export const EXTERNAL_COMMAND_SENDER = Symbol('EXTERNAL_COMMAND_SENDER');

export interface ExternalCommandSender {
  send<T extends PublicCommand>(command: T): Promise<any>;
}
