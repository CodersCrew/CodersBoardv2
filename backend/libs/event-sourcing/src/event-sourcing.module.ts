import {DynamicModule, Module} from '@nestjs/common';
import {EventStorage} from './event-storage/event-storage';
import {TypeOrmEventStorage} from './event-storage/typeorm/event-storage.typeorm';
import {InMemoryEventStore} from './event-storage/in-memory/event-store.in-memory';
import {DomainEventEntity} from './event-storage/typeorm/event.typeorm-entity';
import {EventSourcingModuleConfig} from "./event-sourcing.module-config";
import {Repository} from "typeorm";

@Module({})
export class EventSourcingModule {

    static forFeature(config: EventSourcingModuleConfig): DynamicModule {
        if (config.eventStorage === "typeorm") {
            const optionalImports = [];
            optionalImports.push(config.typeOrmModule);
            return {
                module: EventSourcingModule,
                imports: [...optionalImports],
                providers: [
                    {
                        provide: EventStorage,
                        useFactory: (typeOrmRepository: Repository<DomainEventEntity>) => new TypeOrmEventStorage(config.time, typeOrmRepository)
                    },
                ],
                exports: [EventStorage],
            };
        }

        return {
            module: EventSourcingModule,
            providers: [
                {
                    provide: EventStorage,
                    useFactory: () => new InMemoryEventStore(config.time)
                },
            ],
            exports: [EventStorage],
        };
    }


}
