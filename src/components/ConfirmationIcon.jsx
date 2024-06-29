import React, { useEffect, useState } from 'react'
import { getRankImage } from '../utils'
import { fetchUserFromId } from '../firestoreQueries'
import { person } from '../assets'
import { clippedImage } from '../styles'

const ConfirmationIcon = ({ player }) => {

  return (
    <div className='flex flex-col'>
      <img src={player.profilePicture || person} className={clippedImage}/>
      <h2 className='font-Inter font-light pt-6 text-white'>
        {player.username}
      </h2>
    </div>
  )
}

export default ConfirmationIcon