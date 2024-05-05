import bcrypt from 'bcrypt'
import type { Response } from 'express'

import { TokensService } from '../index.ts'

import { User } from '../../model/user.model.ts'

import { CreateUserDto } from './dto/create-user.dto.ts'
import { LoginUserDto } from './dto/login-user.dto.ts'
import { ApiError } from '../../errorHandling/apiError.ts'

class AuthService {
  public async registr(dto: CreateUserDto, res: Response) {
    try {
      const isEmpty = await this.checkIsEmptyUser(dto.email, res)

      if (isEmpty) {
        const newPassword = await this.generateHashPassword(dto.password)

        const user = await User.create({
          email: dto.email,
          password: newPassword,
          name: dto.name,
          surname: dto.surname,
        })

        const token = await TokensService.createToken({ id: user.id })

        return { user, token }
      }
    } catch {}
  }

  public async login(dto: LoginUserDto, res: Response) {
    try {
      const isEmpty = await this.checkIsEmptyUser(dto.email, res)

      if (isEmpty) {
        const user = await User.findOne({ email: dto.email })

        if (!user) return new ApiError().NOT_FOUND({ res, str: 'Неверный логин или пароль' })

        const isNicePass = await this.verifyPassword(dto.password, user.password, res)

        if (!isNicePass) return new ApiError().NOT_FOUND({ res, str: 'Неверный логин или пароль' })
      } else {
      }
    } catch {}
  }

  private async generateHashPassword(password: string): Promise<string> {
    try {
      const salt = await bcrypt.genSalt(10)
      const hashpassword = await bcrypt.hash(password, salt)

      return hashpassword
    } catch {
      throw new Error()
    }
  }

  private async checkIsEmptyUser(email: string, res: Response) {
    try {
      const user = await User.findOne({ email })

      if (user) return false

      return true
    } catch {
      return res.status(500).send({ status: 500, message: 'server internal' })
    }
  }

  private async verifyPassword(myPass: string, dbPass: string, res: Response) {
    try {
      const isValidPass = await bcrypt.compare(myPass, dbPass)

      return isValidPass
    } catch {
      return new ApiError().SERVER_INTERNAL({ res })
    }
  }
}

export default new AuthService()
