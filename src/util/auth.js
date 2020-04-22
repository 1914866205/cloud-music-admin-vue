export function isAuth(key) {
  return (localStorage.permissions ? JSON.parse(localStorage.permissions) : []).indexOf(key) !== -1
}
