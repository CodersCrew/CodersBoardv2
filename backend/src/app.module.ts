import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TimeProvider, TimeProviderModule} from "@coders-board-library/time-provider";
import {EventSourcingModule} from "@coders-board-library/event-sourcing";

const timeProviderModule = TimeProviderModule.register({source: "system"});
const eventSourcingModule = EventSourcingModule.registerAsync({
    imports: [timeProviderModule],
    inject: [TimeProvider],
    useFactory: (timeProvider: TimeProvider) => {
        return {
            time: timeProvider.currentDate,
            eventStorage: "in-memory"
        }
    }
});

@Module({
    imports: [
        timeProviderModule,
        eventSourcingModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
