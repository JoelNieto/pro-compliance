import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

const passwordRegEx =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,20}$/;

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, { message: 'Nombre de usuario debe ser al menos 5 letras' })
  user_name: string;

  @IsNotEmpty()
  @IsEmail(null, { message: 'Email invalido' })
  email: string;

  @IsNotEmpty()
  @Matches(passwordRegEx, {
    message: `Password must contain Minimum 8 and maximum 20 characters,
  at least one uppercase letter,
  one lowercase letter,
  one number and
  one special character`,
  })
  password: string;
}
