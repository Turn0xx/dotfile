import { ApiProperty } from "@nestjs/swagger";


export class RegistrationIndividualDto {

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  type: string;

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
  type: string;

  @ApiProperty()
  companyName: string;
}