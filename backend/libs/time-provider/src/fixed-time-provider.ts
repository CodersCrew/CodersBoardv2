import {Injectable} from '@nestjs/common';
import {TimeProvider} from '../../../src/bounded-context/shared-kernel/domain/time.provider';
import {TestTimeProvider} from './test-time-provider';

@Injectable()
export class FixedTimeProvider implements TimeProvider, TestTimeProvider {

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
