import * as Yup from 'yup'

export const validationSchemaChannelDialog = (min, max, data, t) => {
  return (
    Yup.object({
      name: Yup.string()
        .min(min, t('Form.Count_symbol', { min, max }))
        .max(max, t('Form.Count_symbol', { min, max }))
        .required(t('Form.Required'))
        .test('unique-name', t('Form.Have_been_unique'), (value) => {
          if (!value) return true
          return !data.map(item => item.name).includes(value.trim())
        }),
    })
  )
}

export const validationSchemaRegistration = (min, max, minPassword, t) => {
  return (
    Yup.object({
      username: Yup.string()
        .min(min, t('Form.Count_symbol', { min, max }))
        .max(max, t('Form.Count_symbol', { min, max }))
        .required(t('Form.Required')),
      password: Yup.string()
        .min(minPassword, t('Form.Min_count_symbol_password', { count: minPassword }))
        .required(t('Form.Required')),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], t('Form.Passwords_have_been_match'))
        .required(t('Form.Required')),
    })
  )
}
