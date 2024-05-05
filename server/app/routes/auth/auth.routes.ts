import { Router } from 'express'

import { AuthController } from '../../controllers/index.ts'

import { LoginUserDto } from '../../dtos/index.ts'

export const authRouter = Router()

authRouter.post('/registration', LoginUserDto, AuthController.registration)
