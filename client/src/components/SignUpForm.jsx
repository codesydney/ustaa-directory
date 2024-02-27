import { Container, TextField, Stack, Button } from '@mui/material'
import { UserAPI } from '../apis/UserAPI'
import useAuthForm from '../hooks/useAuthForm'

const SignUpForm = () => {
  const initialData = { email: '', password: '', passwordConfirm: '' }
  const {
    formData,
    inputErrors,
    fieldRefs,
    isLoading,
    setIsLoading,
    serverError,
    setServerError,
    handleChange,
    handleBlurValidation,
    isSubmitValidationSuccess,
    handleServerErrors,
  } = useAuthForm(initialData, 'signUp')

  const handleSubmit = async event => {
    event.preventDefault()
    setServerError('')

    // run submit validation
    if (!isSubmitValidationSuccess()) return

    setIsLoading(true)

    try {
      const response = await UserAPI.signUp(formData)

      // set jwt in session storage.
      const token = response.data.token
      sessionStorage.setItem('jwt', token)
      setIsLoading(false)
      // Redirect to home?
      console.log('success', response)
    } catch (error) {
      // handle request errors
      handleServerErrors(error)
      setIsLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        {serverError && <p>{serverError}</p>}
        <Stack spacing={3}>
          <TextField
            size="medium"
            id="email"
            label="Email"
            variant="outlined"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlurValidation}
            inputRef={fieldRefs.email}
            error={!!inputErrors.email}
            helperText={inputErrors.email}
          />
          <TextField
            id="password"
            label="Password"
            variant="outlined"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlurValidation}
            inputRef={fieldRefs.password}
            error={!!inputErrors.password}
            helperText={inputErrors.password}
          />
          <TextField
            id="passwordConfirm"
            label="Confirm Password"
            variant="outlined"
            name="passwordConfirm"
            type="password"
            value={formData.passwordConfirm}
            onChange={handleChange}
            onBlur={handleBlurValidation}
            inputRef={fieldRefs.passwordConfirm}
            error={!!inputErrors.passwordConfirm}
            helperText={inputErrors.passwordConfirm}
          />
          <Button
            variant="contained"
            size="large"
            type="submit"
            disabled={isLoading}
          >
            Sign up
          </Button>
        </Stack>
      </form>
    </Container>
  )
}

export default SignUpForm
