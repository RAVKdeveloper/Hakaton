import type { Request, Response } from 'express'

import { ApiError } from '../../errorHandling/apiError.ts'

import { AuthService } from '../../services/index.ts'

class AuthController {
  public async login(req: Request, res: Response) {
    try {
      await AuthService.login()

      res.send({ message: 'Happy hacking' })
    } catch {
      throw new ApiError().SERVER_INTERNAL({ res })
    }
  }
}

export default new AuthController()
