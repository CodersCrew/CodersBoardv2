import {TimeProvider} from '../../bounded-context/shared-kernel/domain/time.provider';

export abstract class TestTimeProvider extends TimeProvider {

    abstract moveCurrentDateTo(date: Date);
}
