import {TimeProviderPort} from '../../../src/bounded-context/shared-kernel/domain/time-provider.port';

export abstract class TestTimeProvider extends TimeProviderPort {

    abstract moveCurrentDateTo(date: Date);
}
