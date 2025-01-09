// import { DateProvider } from '../domain/date-provider';
// import {
//   RegistrationCommand,
//   RegistrationUseCase,
// } from '../application/usecases/register.usecase';
// import { InMemoryOrganizerRepository } from './organizer.in-memory';
// import { Test, TestingModule } from '@nestjs/testing';
// import { ClientModule } from '../client.module';
// import { Organizer } from '../domain/organizer';

export class StubDateProvider implements DateProvider {
  now: Date;
  getNow(): Date {
    return this.now;
  }
}

// describe('Basic Feature : Registration', () => {
//   // let fixture: Fixture;

//   // beforeEach(async () => {
//   //   const testModule: TestingModule = await Test.createTestingModule({
//   //     imports: [ClientModule.forRoot({ testMode: true })],
//   //   }).compile();

//   //   fixture = createFixture(testModule);
//   // });

//   describe('Scenario: User registers for an account', () => {
//     it('Alice wants to register as an organizer', async () => {
//       // fixture.givenNowIs(new Date(2021, 1, 1));
//       // fixture.whenAliceRegisters({
//       // 	name: 'Alice',
//       // 	email: 'alice@gmail.com',
//       // 	password: '12345678',
//       // });
//       // await fixture.thenAliceShouldBeRegistered();
//     });
//   });
// });

// // const createFixture = (di: TestingModule) => {
// //   let throwError: Error;

// //   let dateProvider = di.get<StubDateProvider>('FAKE_DATE_PROVIDER');
// //   let organizerRepository = di.get<InMemoryOrganizerRepository>('ORGANIZER_REPOSITORY')
// //   let registrationUseCase = di.get<RegistrationUseCase>('REGISTRATION_USE_CASE_TEST');

// //   return {
// //     givenNowIs: (now: Date) => {
// //       dateProvider.now = now;
// // 			console.log(dateProvider.getNow());
// //     },

// //     whenAliceRegisters: (data: RegistrationCommand) => {
// //       try {
// //         registrationUseCase.handle(data);
// //       } catch (error) {
// //         throwError = error;
// //       }
// //     },

// //     thenAliceShouldBeRegistered: async () => {
// //       expect(throwError).toBeUndefined();
// //       const orga: Organizer = await organizerRepository.findByEmail('alice@gmail.com');
// // 			expect(orga).toEqual({
// // 				name: 'Alice',
// // 				email: 'alice@gmail.com',
// // 				password: '12345678',
// // 				createdAt: dateProvider.getNow(),
// // 			});
// //     },
// //   };
// // };

// // type Fixture = ReturnType<typeof createFixture>;
