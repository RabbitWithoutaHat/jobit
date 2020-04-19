import React from 'react'
import { useParams } from 'react-router-dom'

export const CompanyPage = () => {
  const companyId = useParams().id
  console.log('CompanyPage -> reviewId', companyId)
  return (
    <div>Companies</div>
  )
}
