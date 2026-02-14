export default function hasToken() {
  try {
    JSON.parse(localStorage.getItem('userId')).token
    return true
  } catch {
    return false
  }
}