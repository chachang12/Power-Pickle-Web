import React from 'react'
import MatchModel from '../models/MatchModel'
import { createMatch } from '../firestoreQueries'
import { NavBar } from '../components'

const MatchCreation = () => {
  return (
    <div>
      <div>
        MatchCreation
      </div>
      <div className='fixed inset-x-0 bottom-6'>
        <NavBar />
      </div>
    </div>
  )
}

export default MatchCreation