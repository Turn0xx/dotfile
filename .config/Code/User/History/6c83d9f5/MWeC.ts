import { Module, OnModuleInit } from '@nestjs/common';
import { RegistrationController } from './framework/controllers/registration.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientSchema } from '../../infrastructure/client.schema';
import { IdentityController } from './framework/controllers/identity.controller';
import { NotificationsModule } from '../../notification-services/notification.module';
import { dateProvider } from '../../../shared/framework/date.provider';
import { clientRepositoryProvider } from './framework/providers/client-repository.provider';
import { registrationUseCaseProvider } from './framework/providers/registration-usecase.provider';
import { validateTokenUseCaseProvider } from './framework/providers/validate-token-usecase.provider';

@Module({
  imports: [TypeOrmModule.forFeature([ClientSchema]), NotificationsModule],
  providers: [
    clientRepositoryProvider,
    registrationUseCaseProvider,
    validateTokenUseCaseProvider,
    dateProvider,
  ],
  controllers: [RegistrationController, IdentityController],
  exports: [clientRepositoryProvider],
})
export class IdentityModule implements OnModuleInit {
  onModuleInit() {
    console.log('IdentityModule has been initialized.');
    console.log( clientRepositoryProvider  )
    
  }

}
