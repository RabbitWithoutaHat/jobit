import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [userLogin, setUserLogin] = useState(null)
  
  const login = useCallback((jwtToken, id, userLogin) => {
    setToken(jwtToken)
    setUserId(id)
    setUserLogin(userLogin)
    localStorage.setItem(
      storageName,
      JSON.stringify({ userId: id, token: jwtToken, userLogin  }),
      )
    }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    if (data && data.token) {
      login(data.token, data.userId, data.userLogin)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, userLogin, ready }
}
