import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {CommandBus as InMemoryCommandBus} from "@nestjs/cqrs";
import {NestInMemoryCommandBus} from "./nest-inmemory-command-bus";

@Module({
    imports: [CqrsModule],
    providers: [
        {
            provide: "EXTERNAL_COMMAND_BUS",
            useFactory: (inMemoryCommandBus: InMemoryCommandBus) => {
                return new NestInMemoryCommandBus(inMemoryCommandBus);
            },
            inject: [InMemoryCommandBus]
        }
    ],
    exports: ["EXTERNAL_COMMAND_BUS"]
})
export class NestInMemoryCommandBusModule {

}
