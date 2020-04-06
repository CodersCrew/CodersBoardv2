import {Injectable} from '@nestjs/common';
import {TestTimeProvider} from './test-time-provider';
import {TimeProvider} from "@coders-board-library/time-provider/time-provider";

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
