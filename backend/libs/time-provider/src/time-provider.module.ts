import {DynamicModule, Module, OnModuleInit} from '@nestjs/common';
import {TimeProviderModuleConfig} from "@coders-board-library/time-provider/time-provider.module-config";
import {FixedTimeProvider} from "@coders-board-library/time-provider/fixed-time-provider";
import {SystemTimeProvider} from "@coders-board-library/time-provider/system-time-provider";
import {TimeProvider} from "@coders-board-library/time-provider/time-provider";

//TODO: Add custom logging with config and time

@Module({})
export class TimeProviderModule {

    static forRoot(config: TimeProviderModuleConfig = {source: "system"}): DynamicModule {
        const timeProvider = {
            provide: TimeProvider,
            useFactory: () => {
                switch (config.source) {
                    case "fixed":
                        return FixedTimeProvider.withFixedDate(config.date);
                    case "system":
                        return new SystemTimeProvider();
                }
            }
        };

        return {
            module: TimeProviderModule,
            providers: [timeProvider],
            exports: [timeProvider]
        }
    }

}
