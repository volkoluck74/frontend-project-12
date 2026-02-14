const createSubmitHandler = ({
  dispatch,
  actions = [],
  showError,
  t,
  transformData,
  onSuccess,
  errorMessage = 'Toast.Error_sended',
  shouldReset = false,
}) => {
  return async (values, formikHelpers) => {
    try {
      const data = transformData ? transformData(values) : values
      for (const actionConfig of actions) {
        const { action, transform } = actionConfig
        const actionData = transform ? transform(data) : data
        await dispatch(action(actionData)).unwrap()
      }
      if (onSuccess) {
        await onSuccess(data, formikHelpers)
      }
      if (shouldReset && formikHelpers) {
        formikHelpers.resetForm()
      }
    } catch (error) {
      showError(t(errorMessage))
      throw error
    }
  }
}

export default createSubmitHandler
