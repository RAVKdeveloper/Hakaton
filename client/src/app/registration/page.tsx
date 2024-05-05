import s from './style.module.css'

import { RegistrationForm } from '@/features'

export default function Registration() {
  return (
    <main className={s.page}>
      <RegistrationForm />
    </main>
  )
}
