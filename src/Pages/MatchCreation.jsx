import { useState } from 'react'
import MatchModel from '../models/MatchModel'
import { createMatch, fetchUserFromUsername } from '../firestoreQueries'
import { NavBar } from '../components'
import { pickleLogo } from '../assets'
import { mainInputBox, mainHeaderStyle, matchCreationFormHeader } from '../styles'
import { useNavigate } from 'react-router-dom'


const MatchCreation = () => {

  const [teammate, setTeammate] = useState('')
  const [opponent1, setOpponent1] = useState('')
  const [opponent2, setOpponent2] = useState('')
  const [location, setLocation] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Fetch the user data
    const teammateData = await fetchUserFromUsername(teammate);
    const opponent1Data = await fetchUserFromUsername(opponent1);
    const opponent2Data = await fetchUserFromUsername(opponent2);
  
    // Check if all users are unique
    if (new Set([teammateData.id, opponent1Data.id, opponent2Data.id]).size !== 3) {
      alert('All users must be unique');
      return;
    }
  
    // Navigate to the MatchConfirmation page with state
    navigate('/match-confirmation', { state: { teammate: teammateData, opponent1: opponent1Data, opponent2: opponent2Data } });
  };

  return (
    <div className='flex flex-col justify-center items-center pt-4'>
      <img src={pickleLogo} alt="pickle logo" className='w-[100px] pb-4'/>
      <div>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <h2 className={matchCreationFormHeader}>
          Select Teammate
        </h2>
        <input 
          type='text'
          value={teammate}
          placeholder='Search for a teammate'
          className={mainInputBox}
          onChange={(e) => setTeammate(e.target.value)}
        />
        <div style={{ borderTop: "1px solid white", margin: "1rem 0" }}></div> {/* This is the divider */}
        <h2 className={matchCreationFormHeader}>
          Select Opponents
        </h2>
        <input
          type='text'
          value={opponent1}
          placeholder='Search for an opponent'
          className={mainInputBox}
          onChange={(e) => setOpponent1(e.target.value)}
        />

          <input
            type='text'
            value={opponent2}
            placeholder='Search for an opponent'
            className={mainInputBox}
            onChange={(e) => setOpponent2(e.target.value)}
          />
          <button type="submit" className='py-4' >
            <h6 className='font-Inter font-semibold text-[14px] text-dark-green bg-light-green px-2 py-1 rounded-md'>
                Next
            </h6>
          </button>
        </form>
      </div>
      <div className='fixed inset-x-0 bottom-6'>
        <NavBar />
      </div>
    </div>
  )
}

export default MatchCreation