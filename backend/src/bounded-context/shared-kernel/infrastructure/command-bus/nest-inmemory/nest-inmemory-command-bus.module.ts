import {DynamicModule, Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {CommandBus as InMemoryCommandBus} from "@nestjs/cqrs";
import {NestInMemoryCommandBus} from "./nest-inmemory-command-bus";
import {ExternalCommandHandlerType} from "../../../application/external-command-bus";
import {ModuleRef} from "@nestjs/core";

@Module({})
export class NestInMemoryCommandBusModule {

    static withHandlers(handlers: ExternalCommandHandlerType[] = []): DynamicModule {
        return {
            module: NestInMemoryCommandBusModule,
            imports: [CqrsModule],
            providers: [
                {
                    provide: "EXTERNAL_COMMAND_BUS",
                    useFactory: (inMemoryCommandBus: InMemoryCommandBus, moduleRef: ModuleRef) => {
                        const commandBus = new InMemoryCommandBus(moduleRef);
                        commandBus.register(handlers);
                        return new NestInMemoryCommandBus(inMemoryCommandBus);
                    },
                    inject: [InMemoryCommandBus]
                }
            ],
            exports: ["EXTERNAL_COMMAND_BUS"]
        }
    }

}
