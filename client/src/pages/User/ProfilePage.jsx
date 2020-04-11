import React, { useState } from 'react'
import { useHttp } from '../../hooks/http.hook'
import Loader from '../../common/Loader'
import EditProfileInfo from './components/EditProfileInfo'
import ProfileInfo from './components/ProfileInfo'
import { ReviewList } from '../Review/components/ReviewList'

export const ProfilePage = () => {
  const { loading } = useHttp()
  const [user, setUser] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  if (loading) {
    return <Loader />
  }

  return (
    <>
      {isEdit ? (
        <EditProfileInfo user={user} setIsEdit={setIsEdit} />
      ) : (
        <ProfileInfo setUser={setUser} user={user} setIsEdit={setIsEdit} />
      )}

      <ReviewList />
    </>
  )
}
