import { FC } from 'react'
import { TextField, Typography, Button } from '@mui/material'

import s from '../assets/style.module.css'

export const RegistrationForm: FC = () => {
  return (
    <div className={s.box}>
      <Typography>Регистрация</Typography>
      <TextField placeholder='Email'></TextField>
      <TextField placeholder='Пароль'></TextField>
      <TextField placeholder='Имя'></TextField>
      <TextField placeholder='Фамилия'></TextField>
      <Button fullWidth variant='contained'>
        Зарегистрироваться
      </Button>
    </div>
  )
}
