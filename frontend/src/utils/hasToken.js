export default function hasToken () {
  try {
    const token = JSON.parse(localStorage.getItem('userId')).token
    return true
  } catch {
    return false
  }
}
