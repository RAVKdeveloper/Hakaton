import { IsNotEmpty } from 'class-validator'

export class CreateSiteDto {
  @IsNotEmpty()
  readonly name: string

  @IsNotEmpty()
  readonly domen: string

  @IsNotEmpty()
  readonly html: string
}
