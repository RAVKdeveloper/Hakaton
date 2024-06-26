import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateAuthDto {
  @IsEmail()
  readonly email: string

  @IsNotEmpty()
  readonly password: string

  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly surname: string
}
