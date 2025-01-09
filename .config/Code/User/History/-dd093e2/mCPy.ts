import { ApiProperty } from '@nestjs/swagger';

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

  @ApiPropertyO()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

