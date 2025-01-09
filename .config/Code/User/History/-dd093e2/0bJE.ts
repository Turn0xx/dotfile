import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegistrationIndividualDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({
    enum: ['individual' , 'company'],
  })
  type: string;

  @ApiPropertyOptional()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

