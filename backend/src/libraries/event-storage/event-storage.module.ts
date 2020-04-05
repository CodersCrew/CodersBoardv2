import {Module} from '@nestjs/common';
import {EventStorage} from './event-storage';
import {TypeOrmEventStorage} from './typeorm/event-storage.typeorm';
import {InMemoryEventStore} from './embedded/event-store.embedded';
import {TimeProvider} from '../../bounded-context/shared-kernel/domain/time.provider';
import {SystemTimeProvider} from './system-time-provider.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {DomainEventEntity} from './typeorm/event.typeorm-entity';

const optionalImports = [];
if ('typeorm' === process.env.DATABASE_MODE) {
    optionalImports.push(TypeOrmModule.forFeature([DomainEventEntity]));
}

@Module({
    imports: [...optionalImports],
    controllers: [],
    providers: [
        {
            provide: TimeProvider,
            useClass: SystemTimeProvider,
        },
        {
            provide: EventStorage,
            useClass: 'typeorm' === process.env.DATABASE_MODE ? TypeOrmEventStorage : InMemoryEventStore,
        },
    ],
    exports: [
        EventStorage,
        TimeProvider,
    ],
})
export class EventStorageModule {
}
