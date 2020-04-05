import {Injectable} from '@nestjs/common';
import {TimeProvider} from '../../../src/bounded-context/shared-kernel/domain/time.provider';

@Injectable()
export class SystemTimeProvider implements TimeProvider {

    currentDate(): Date {
        return new Date();
    }
}
