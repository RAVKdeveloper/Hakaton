import jwt from 'jsonwebtoken'

import { CreateTokenDto } from './dto/create-token.dto.ts'

class TokensService {
  public async createToken(dto: CreateTokenDto): Promise<string> {
    try {
      const token = await jwt.sign(
        {
          _id: dto.id,
        },
        process.env.SECRET ?? '',
        {
          expiresIn: '30d',
        },
      )

      return token
    } catch {
      throw new Error()
    }
  }
}

export default new TokensService()
