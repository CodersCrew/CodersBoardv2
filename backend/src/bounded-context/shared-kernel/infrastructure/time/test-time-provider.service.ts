import {TimeProvider} from '../../domain/time.provider';

export abstract class TestTimeProvider extends TimeProvider {

    abstract moveCurrentDateTo(date: Date);
}
