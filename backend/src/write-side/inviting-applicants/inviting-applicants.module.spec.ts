import { Test, TestingModule } from '@nestjs/testing';
import { InvitingApplicantsModule } from './inviting-applicants.module';
import { ApplicantInvitationCommand } from '@coders-board-library/public-messages/inviting-applicants/command/applicant-invitation.command';
import InviteApplicantToAssociation = ApplicantInvitationCommand.InviteApplicantToAssociation;
import { CommandBus, EventBus, IEvent } from '@nestjs/cqrs';
import {
  ApplicantInvitationPublicEvent,
  PublicEvent,
} from '@coders-board-library/public-messages';
import ApplicantInvited = ApplicantInvitationPublicEvent.ApplicantInvited;
import SpyInstance = jest.SpyInstance;
import AbstractPublicEvent = ApplicantInvitationPublicEvent.AbstractPublicEvent;
import { Type } from '@nestjs/common';

/**
 * Test of InvitingApplicants. In tests of logic we bypass presentation layer.
 * We treat the module as a black-box. The test checks expected output (published event) based on input (command).
 */

describe('Feature: Inviting applicants', () => {
  let commandBus: CommandBus;
  let eventBusPublishSpy: EventBusSpy;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [InvitingApplicantsModule],
    }).compile();
    await app.init();
    commandBus = app.get<CommandBus>(CommandBus);
    eventBusPublishSpy = eventBusSpy(app);
  });

  describe('Given: Applicant to invite', () => {
    const command = new InviteApplicantToAssociation(
      'email@email.com',
      'Jan',
      'Kowalski',
    );

    describe('When: Invite the applicant', () => {

      beforeEach(async () => {
        await commandBus.execute(command);
      });

      it('Then: Applicant should be invited', () => {

        expectOnlyPublishedEvent(eventBusPublishSpy, {
          type: ApplicantInvited,
          payload: {
            firstName: command.firstName,
            lastName: command.lastName,
            personalEmail: command.personalEmail,
          },
        });

      });

      afterEach(() => {
        eventBusPublishSpy.mockClear();
      });

    });
  });
});

export type EventBusSpy = SpyInstance<void, [IEvent]>

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

export function eventBusSpy(app: TestingModule): EventBusSpy{
  const eventBus = app.get<EventBus>(EventBus);
  return  jest.spyOn(eventBus, 'publish');
}
