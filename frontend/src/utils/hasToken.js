export default function hasToken () {
    return localStorage.getItem('token') !== 'null' && localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined && localStorage.getItem('token') !== 'undefined'
}