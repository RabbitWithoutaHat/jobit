import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/Loader'
import EditProfileInfo from '../components/EditProfileInfo'
import ProfileInfo from '../components/ProfileInfo'
import ReviewCard from '../components/ReviewInfo'

export const ProfilePage = () => {
  const { token, userId } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [user, setUser] = useState({})
  const [isEdit, setIsEdit] = useState(false)

  const getUser = useCallback(async () => {
    try {
      const fetched = await request(`/api/user/${userId}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setUser(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    getUser()
  }, [getUser])

  if (loading) {
    return <Loader />
  }

  return (
  <div>{isEdit ? <EditProfileInfo setIsEdit={setIsEdit}/>
  : <ProfileInfo user={user} setIsEdit={setIsEdit} />}
    <ReviewCard />
  </div>)
}
