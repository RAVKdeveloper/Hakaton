import { Router } from 'express'

import { AuthController } from '../../controllers/index.ts'

export const authRouter = Router()

authRouter.post('/login', AuthController.login)
