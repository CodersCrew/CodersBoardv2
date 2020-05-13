import {CommandBus} from '@nestjs/cqrs';
import {InternalCommandSender} from "../../application/internal-command-sender/internal-command-sender";
import {InternalCommand} from "../../application/internal-command-sender/internal-command";

export class NestJsInternalCommandSender implements InternalCommandSender {
  constructor(private readonly commandBus: CommandBus) {
  }

  send<T extends InternalCommand>(command: T) {
    return this.commandBus.execute(command);
  }
}
