import { Injectable } from '@nestjs/common';
import { TimeProviderPort } from '../../../src/write-side/shared-kernel/domain/time-provider.port';

@Injectable()
export class SystemTimeProvider implements TimeProviderPort {
  currentDate(): Date {
    return new Date();
  }
}
