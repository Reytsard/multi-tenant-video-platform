import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty()
  email: string;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  repeatPassword: string;
}
