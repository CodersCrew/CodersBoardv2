import {Injectable} from '@nestjs/common';
import {TimeProvider} from '../../domain/time.provider';

@Injectable()
export class SystemTimeProvider implements TimeProvider {
    currentDate(): Date {
        return new Date();
    }
}
