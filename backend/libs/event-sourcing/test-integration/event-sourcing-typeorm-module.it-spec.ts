import {
  EVENT_STORAGE,
  EventStorage,
} from '@coders-board-library/event-sourcing/api/event-storage';
import { Test, TestingModule } from '@nestjs/testing';
import { EventSourcingModule } from '@coders-board-library/event-sourcing';
import * as moment from 'moment';
import { EventStreamVersion } from '@coders-board-library/event-sourcing/api/event-stream-version.valueobject';
import { EventStreamId } from '@coders-board-library/event-sourcing/api/event-stream-id.valueboject';
import uuid = require('uuid');

const time = {
  15_00: moment.utc(new Date(2020, 4, 7, 15, 0)).toDate(),
  15_20: moment.utc(new Date(2020, 4, 7, 15, 20)).toDate(),
  15_30: moment.utc(new Date(2020, 4, 7, 15, 30)).toDate(),
  15_40: moment.utc(new Date(2020, 4, 7, 15, 40)).toDate(),
};

const aggregate1id = uuid.v4();
const aggregate2id = uuid.v4();

const events = {
  aggregate1: {
    id: aggregate1id,
    eventStreamId: EventStreamId.from('aggregateType1', aggregate1id),
    event1: {
      eventId: uuid.v4(),
      eventType: 'EVENT_TYPE_1',
      streamId: aggregate1id,
      streamGroup: 'aggregateType1',
      occurredAt: time['1530'],
      data: { value: 'value' },
    },
    event2: {
      eventId: uuid.v4(),
      eventType: 'EVENT_TYPE_2',
      streamId: aggregate1id,
      streamGroup: 'aggregateType1',
      occurredAt: time['1540'],
      data: {},
    },
  },
  aggregate2: {
    id: aggregate2id,
    eventStreamId: EventStreamId.from('aggregateType2', aggregate2id),
    event1: {
      eventId: uuid.v4(),
      eventType: 'EVENT_TYPE_1',
      streamId: aggregate2id,
      streamGroup: 'aggregateType2',
      occurredAt: time['1530'],
      data: { value: 'value' },
    },
    event2: {
      eventId: uuid.v4(),
      eventType: 'EVENT_TYPE_2',
      streamId: aggregate2id,
      streamGroup: 'aggregateType2',
      occurredAt: time['1540'],
      data: {},
    },
  },
};

describe('Feature: Event Storage', () => {
  let currentDate: Date;
  let eventStorage: EventStorage;

  const eventSourcingModuleConfig = {
    useFactory: () => {
      return {
        time: () => currentDate,
      };
    },
  };
  const typeOrmEventSourcingModule = EventSourcingModule.registerTypeOrmAsync(
    eventSourcingModuleConfig,
  );
  const inMemoryEventSourcingModule = EventSourcingModule.registerInMemoryAsync(
    eventSourcingModuleConfig,
  );
  const eventStoreEventSourcingModule = EventSourcingModule.registerEventStoreAsync(
    eventSourcingModuleConfig,
  );

  [
    //{name: "in memory", impl: inMemoryEventSourcingModule},
    //{name: "EventStorage", impl: eventStoreEventSourcingModule},
    { name: 'TypeORM', impl: typeOrmEventSourcingModule },
  ].forEach(testCase => {
    beforeAll(async () => {
      const app: TestingModule = await Test.createTestingModule({
        imports: [testCase.impl],
      }).compile();
      await app.init();
      eventStorage = app.get<EventStorage>(EVENT_STORAGE);
    });

    describe(`Scenario: Event Store module with ${testCase.name} implementation`, () => {
      describe('Given: Events to store', () => {
        describe('When: store the events', () => {
          beforeAll(async done => {
            await eventStorage.store(
              events.aggregate1.eventStreamId,
              events.aggregate1.event1,
              EventStreamVersion.newStream(),
            );
            await eventStorage.store(
              events.aggregate2.eventStreamId,
              events.aggregate2.event1,
              EventStreamVersion.newStream(),
            );
            await eventStorage.store(
              events.aggregate1.eventStreamId,
              events.aggregate1.event2,
              EventStreamVersion.exactly(1),
            );
            await eventStorage.store(
              events.aggregate2.eventStreamId,
              events.aggregate2.event2,
              EventStreamVersion.exactly(1),
            );
            done();
          });

          it('Then: The event should be queryable by all event', async done => {
            currentDate = time['1540'];
            const stored = await eventStorage.readEvents(
              events.aggregate1.eventStreamId,
            );
            expect(stored).toContainsInArray(events.aggregate1.event1);
            expect(stored).toContainsInArray(events.aggregate1.event2);
            done();
          });

          it('Then: The event should be queryable by time', async () => {
            expect(
              await eventStorage.readEvents(
                events.aggregate1.eventStreamId,
                time['1520'],
              ),
            ).toStrictEqual([]);
            expect(
              await eventStorage.readEvents(
                events.aggregate1.eventStreamId,
                time['1530'],
              ),
            ).toContainsInArray(events.aggregate1.event1);

            expect(
              await eventStorage.readEvents(
                events.aggregate1.eventStreamId,
                time['1540'],
              ),
            ).toContainsInArray(events.aggregate1.event1);
            expect(
              await eventStorage.readEvents(
                events.aggregate1.eventStreamId,
                time['1540'],
              ),
            ).toContainsInArray(events.aggregate1.event2);
          });

          //FIXME: EventStore saves the same event twice
          xit('Then: The event cannot be stored twice', async () => {
            await expect(
              eventStorage.store(
                events.aggregate1.eventStreamId,
                events.aggregate1.event1,
                EventStreamVersion.exactly(2),
              ),
            ).rejects.toMatch(
              `Event stream already contains this event with id ${events.aggregate1.event1.eventId}!`,
            );
          });

          it('Then: The event cannot be stored if aggregate was modified', async () => {
            const anotherEvent2 = {
              eventId: uuid.v4(),
              eventType: 'EVENT_TYPE_2',
              streamId: aggregate1id,
              streamGroup: 'aggregateType1',
              occurredAt: time['1540'],
              data: {},
            };
            await expect(
              eventStorage.store(
                events.aggregate1.eventStreamId,
                anotherEvent2,
                EventStreamVersion.exactly(1),
              ),
            ).rejects.toEqual(
              new Error(
                `Event stream for aggregate was modified concurrently!`,
              ),
            );
          });
        });
      });
    });
  });
});

//TODO: How to move to jest-utils?
expect.extend({
  toContainsInArray(received: any[], argument: any) {
    const pass = this.equals(
      received,
      expect.arrayContaining([expect.objectContaining(argument)]),
    );

    if (pass) {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received,
          )} not to contain object ${this.utils.printExpected(argument)}`,
        pass: true,
      };
    } else {
      return {
        message: () =>
          `expected ${this.utils.printReceived(
            received,
          )} to contain object ${this.utils.printExpected(argument)}`,
        pass: false,
      };
    }
  },
});

declare global {
  namespace jest {
    interface Matchers<R> {
      toContainsInArray(argument: any): R;
    }
  }
}
