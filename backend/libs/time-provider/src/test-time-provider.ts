import {TimeProviderPort} from '../../../src/write-side/shared-kernel/domain/time-provider.port';

export abstract class TestTimeProvider extends TimeProviderPort {

    abstract moveCurrentDateTo(date: Date);
}
