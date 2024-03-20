import { api } from './configs/axiosConfig'
import { defineCancelApiObject } from './configs/axiosUtils'

const usersURL = '/users'

const getAll = async ({ search = '', page = 1 }, cancel = false) => {
  const params = { search, page }
  const signal = cancel
    ? cancelApiObject[this.getAll.name].handleRequestCancellation().signal
    : undefined

  try {
    const response = await api.get(usersURL, { params, signal })
    return response.data
  } catch (error) {
    console.error('Error fetching users:', error)
    return { users: [], meta: {} }
  }
}

const signIn = async formData => {
  const signInURL = usersURL + '/signin'
  const response = await api.post(signInURL, formData)
  return response
}

const signUp = formData => {
  const signUpURL = `${usersURL}/signup`
  return api.post(signUpURL, formData)
}

const requestReset = async formData => {
  const requestResetURL = usersURL + '/request-reset-password'
  const response = await api.post(requestResetURL, formData)
  return response
}

const resetPassword = async (formData, token) => {
  const resetPasswordURL = usersURL + `/reset-password?token=${token}`
  const response = await api.post(resetPasswordURL, formData)
  return response
}

export const UserAPI = {
  getAll,
  signIn,
  signUp,
  requestReset,
  resetPassword,
}

// defining the cancel API object for UserAPI
const cancelApiObject = defineCancelApiObject(UserAPI)
