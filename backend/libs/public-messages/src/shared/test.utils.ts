import {AbstractPublicEvent, PublicEvent} from "@coders-board-library/public-messages";
import SpyInstance = jest.SpyInstance;

interface Type<T> extends Function {
  new (...args: any[]): T;
}

export type EventBusSpy = SpyInstance<void, [any]>

export function expectOnlyPublishedEvent<T extends PublicEvent>(eventBusSpy: EventBusSpy, expected: ExpectedPublishEvent<T>){
  const publishedEvent = eventBusSpy.mock.calls[0][0]
  return expectEvent(publishedEvent, expected);
}

export type ExpectedPublishEvent<T extends PublicEvent> = { type: Type<T>; payload: T['payload'] };

export function expectEvent<T extends PublicEvent>(
    actual: unknown,
    expected: ExpectedPublishEvent<T>,
) {
  if (isPublicEvent(actual)) {
    expect(actual).toBeInstanceOf(expected.type);
    expect(actual.payload).toStrictEqual(expected.payload);
  } else {
    throw new Error('Event is not public event!');
  }
}

export function isDefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}

export function isPublicEvent(event: unknown | undefined): event is PublicEvent {
  return isDefined(event) && event instanceof AbstractPublicEvent;
}
