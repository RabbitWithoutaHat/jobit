import React, { useState, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import Loader from '../../common/Loader'
import EditProfileInfo from './components/EditProfileInfo'
import ProfileInfo from './components/ProfileInfo'
import { ReviewList } from '../Review/components/ReviewList'
import { useParams } from 'react-router-dom'

export const ProfilePage = () => {
  const { loading } = useHttp()
  const userId = useParams().id
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
        <ProfileInfo selectUserId={userId} setUser={setUser} user={user} setIsEdit={setIsEdit} />
      )}
      <ReviewList selectUserId={userId} isProfilePage={true} />
    </>
  )
}
