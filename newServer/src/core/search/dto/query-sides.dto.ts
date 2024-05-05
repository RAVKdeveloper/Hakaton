import { IsNotEmpty } from 'class-validator'

export class QuerySidesDto {
  @IsNotEmpty()
  readonly searchValue: string

  @IsNotEmpty()
  readonly page: string

  readonly take?: string
}
