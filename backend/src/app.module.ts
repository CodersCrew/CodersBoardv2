import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TimeProviderModule} from "@coders-board-library/time-provider";
import {EventSourcingModule} from "@coders-board-library/event-sourcing";

@Module({
    imports: [
        TimeProviderModule.forRoot({source: "system"}),
        EventSourcingModule.forFeature({
            time: () => new Date(),
            eventStorage: "in-memory"
        })
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {
}
