import type { Request, Response } from 'express'

import { validationResult } from 'express-validator'

import { ApiError } from '../../errorHandling/apiError.ts'

import { AuthService } from '../../services/index.ts'

class AuthController {
  public async registration(req: Request, res: Response) {
    try {
      const dto = validationResult(req)

      if (!dto.isEmpty()) {
        return new ApiError().BAD_REQUEST({ res, str: dto.array() })
      }

      const data = await AuthService.registr(req.body, res)

      if (!data) return new ApiError().SERVER_INTERNAL({ res })

      res.cookie('access-token_hakaton', data.token, {
        httpOnly: true,
      })

      return res.send(data.user)
    } catch {
      return new ApiError().SERVER_INTERNAL({ res })
    }
  }
}

export default new AuthController()
