import hasToken from './hasToken.js'

export default function getAuthHeader() {
  if (hasToken()) {
    const token = JSON.parse(localStorage.getItem('userId')).token
    return { Authorization: `Bearer ${token}` }
  }
  return {}
}
