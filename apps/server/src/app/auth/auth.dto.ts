import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignInDTO {
  @ApiProperty({
    example: 'joel.nieto@domain.com',
    description: 'User email',
    required: true,
  })
  @IsEmail()
  public email: string;

  @ApiProperty({ example: 'abcd1234', required: true })
  @IsString()
  public password: string;
}
