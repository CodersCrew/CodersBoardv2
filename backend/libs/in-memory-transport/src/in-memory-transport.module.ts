import { Module } from '@nestjs/common';
import {CqrsModule} from "@nestjs/cqrs";

@Module({
  providers: [CqrsModule],
  exports: [],
})
export class InMemoryTransportModule {}
