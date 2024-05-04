import { Router } from 'express'

import { authRouter } from './auth/auth.routes.ts'

export const globalRouter = Router()

globalRouter.use('/auth', authRouter)
