import {Inject, Injectable} from '@nestjs/common';
import {ExternalCommandBus} from "./bounded-context/shared-kernel/application/external-command-bus";

@Injectable()
export class AppService {

    constructor(@Inject('EXTERNAL_COMMAND_BUS') private readonly externalCommandBus: ExternalCommandBus) {
    }

    getHello(): string {
        return 'Hello World!';
    }
}
