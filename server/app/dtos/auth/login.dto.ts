import { body } from 'express-validator'

export const LoginUserDto = [
  body('email').isEmail(),
  body('password').isLength({ min: 5, max: 65 }),
  body('name').isLength({ min: 2, max: 30 }),
  body('surname').isLength({ min: 2, max: 70 }),
]
