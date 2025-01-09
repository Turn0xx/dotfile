import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegistrationDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty({
    enum: ['individual' , 'company'],
  })
  type: 'individual' | 'company';

  @ApiPropertyOptional()
  firstName: string;

  @ApiPropertyOptional()
  lastName: string;

  @ApiPropertyOptional()
  companyName: string;
}

