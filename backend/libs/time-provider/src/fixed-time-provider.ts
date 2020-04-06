import {Injectable} from '@nestjs/common';
import {TimeProviderPort} from '../../../src/write-side/shared-kernel/domain/time-provider.port';
import {TestTimeProvider} from './test-time-provider';

@Injectable()
export class FixedTimeProvider implements TimeProviderPort, TestTimeProvider {

    private constructor(private date: Date) {
    }

    static withFixedDate(date: Date = new Date()) {
        return new FixedTimeProvider(date);
    }

    currentDate(): Date {
        return this.date;
    }

    moveCurrentDateTo(date: Date) {
        this.date = date;
    }
}
