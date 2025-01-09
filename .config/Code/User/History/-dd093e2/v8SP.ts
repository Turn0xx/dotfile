import { ApiProperty } from "@nestjs/swagger";


export class RegistrationIndividualDto {

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  type: 'individual';

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;
}

export class RegistrationCompanyDto {

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  type: 'company';

  @ApiProperty()
  companyName: string;
}