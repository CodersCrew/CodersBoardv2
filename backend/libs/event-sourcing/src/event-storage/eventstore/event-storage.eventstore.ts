import { EventStorage } from '../../api/event-storage';
import * as moment from 'moment';
import { HttpService, Injectable } from '@nestjs/common';
import { EventStreamVersion } from '../../api/event-stream-version.valueobject';
import { StorageEventEntry } from '../../api/storage-event-entry';
import { Time } from '../../time.type';
import {map, tap} from 'rxjs/operators';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';

const EXPECTED_ANY_VERSION = -2;
const EXPECTED_STREAM_NOT_EXISTS = -1;
const EXPECTED_STREAM_IS_EMPTY = 0;

@Injectable()
export class EventStoreEventStorage implements EventStorage {
  constructor(
    private readonly time: Time,
    private readonly baseUrl: string,
    private readonly httpService: HttpService,
  ) {}

  store(
    streamId: EventStreamId,
    event: StorageEventEntry,
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<any> {
    const eventRequestBody: PostEventRequestBody = {
      eventId: event.eventId,
      eventType: event.eventType,
      data: event.payload,
      metadata: {}
    };
    return this.httpService
      .post(`${this.baseUrl}/streams/${streamId.raw}`, eventRequestBody, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'ES-EventType': eventRequestBody.eventType,
          'ES-EventId': eventRequestBody.eventId,
          'ES-CurrentVersion': expectedVersion
            ? expectedVersion.raw
            : EXPECTED_ANY_VERSION,
          'Authorization': `Basic ${EventStoreEventStorage.toBasicAuthToken("admin","changeit")}`,
        },
      })
      .toPromise();
  }

  //TODO: Change to 1 API CALL
  storeAll(
    streamId: EventStreamId,
    events: StorageEventEntry[],
    expectedVersion: EventStreamVersion | undefined = undefined,
  ): Promise<void> {
    return Promise.all(
      events
        .filter(event => event.aggregateId === streamId.aggregateId)
        .map((value, index) =>
          this.store(
            streamId,
            value,
            expectedVersion
              ? EventStreamVersion.exactly(expectedVersion.raw + index)
              : expectedVersion,
          ),
        ),
    ).then();
  }

  readEvents(streamId: EventStreamId, toDate?: Date) {
    const maxEventDate = toDate ? toDate : this.time();
    return this.getEventsBy(streamId).then(events =>
      events.filter(it =>
        moment(it.occurredAt).isSameOrBefore(moment(maxEventDate)),
      ),
    );
  }

  private getEventsBy(streamId: EventStreamId): Promise<StorageEventEntry[]> {
    return this.httpService
      .get(`${this.baseUrl}/streams/${streamId.raw}?embed=body`, {
        headers: {
          'Accept': 'application/vnd.eventstore.atom+json',
          'Authorization': `Basic ${EventStoreEventStorage.toBasicAuthToken("admin","changeit")}`,
        },
      })
      .pipe(
        map(response =>
          response.data.entries.map(it => {
            return {
              eventId: it.eventId,
              eventType: it.eventType,
              occurredAt: it.updated,
              aggregateId: it.streamId,
              aggregateType: streamId.aggregateType, //TODO: Get for eventStreamId
              payload: it.data,
            };
          }),
        ),
      )
      .toPromise();
  }

  private static toBasicAuthToken(username: string, password: string){
    return Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  }
}
