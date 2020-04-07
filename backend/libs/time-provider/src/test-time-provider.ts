import { TimeProvider } from '@coders-board-library/time-provider/time-provider';

export abstract class TestTimeProvider extends TimeProvider {
  abstract moveCurrentDateTo(date: Date);
}
