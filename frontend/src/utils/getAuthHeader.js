function hasToken () {
  try{
    const token = JSON.parse(localStorage.getItem('userId')).token;
    return true;
  }
  catch {
    return false;
  }
    
}

export default function getAuthHeader () {
  if (hasToken()) {
    const token = JSON.parse(localStorage.getItem('userId')).token;
    return { Authorization: `Bearer ${token}` };
  }
  return {};
}