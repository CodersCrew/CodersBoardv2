import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {NestInMemoryCommandBusModule} from "./bounded-context/shared-kernel/infrastructure/command-bus/nest-inmemory/nest-inmemory-command-bus.module";

@Module({
  imports: [NestInMemoryCommandBusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
