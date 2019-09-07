import React, { Fragment, useEffect } from 'react'

const SingleCompanyPage = props => {
  const {
    match,
    getCompanyById,
    company: { singleCompany, isFetching }
  } = props

  useEffect(() => {
    if (match) {
      getCompanyById(match.params.id)
    }
  }, [match, getCompanyById])

  return (
    <Fragment />
  )
}

export default SingleCompanyPage
