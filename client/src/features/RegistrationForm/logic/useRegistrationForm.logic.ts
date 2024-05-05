import { useForm } from 'react-hook-form'

export const useRegistrationForm = () => {
  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm({ mode: 'all' })

  return {
    register,
    isValid,
  }
}
