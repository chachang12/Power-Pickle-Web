import { useState } from 'react'
import MatchModel from '../models/MatchModel'
import { createMatch, fetchUserFromUsername } from '../firestoreQueries'
import { NavBar } from '../components'
import { pickleLogo, check } from '../assets'
import { mainInputBox, mainHeaderStyle, matchCreationFormHeader } from '../styles'
import { useNavigate } from 'react-router-dom'

const MatchCreation = () => {
  const navigate = useNavigate();
  const [teammate, setTeammate] = useState('')
  const [opponent1, setOpponent1] = useState('')
  const [opponent2, setOpponent2] = useState('')
  const [location, setLocation] = useState('')
  
  const [teammateData, setTeammateData] = useState(null)
  const [opponent1Data, setOpponent1Data] = useState(null)
  const [opponent2Data, setOpponent2Data] = useState(null)

  const handleConfirm = async (username, setter) => {
    const userData = await fetchUserFromUsername(username);
    if (userData) {
      if (
        (teammateData && teammateData.username === username) ||
        (opponent1Data && opponent1Data.username === username) ||
        (opponent2Data && opponent2Data.username === username)
      ) {
        alert('This user has already been confirmed');
      } else {
        setter(userData); // Set the user data
        // Removed setDataConfirmed(true); as it's not needed
      }
    } else {
      alert('User does not exist');
    }
  };

  const handleNext = () => {
    if (teammateData && opponent1Data && opponent2Data) {
      navigate('/match-confirmation', { state: { teammate: teammateData, opponent1: opponent1Data, opponent2: opponent2Data } });
    } else {
      alert('All users must be confirmed');
    }
  };

  return (
    <div className='flex flex-col justify-center items-center pt-4'>
      <img src={pickleLogo} alt="pickle logo" className='w-[100px] pb-4'/>
      <div className='flex flex-col items-center'>
        <h2 className={matchCreationFormHeader}>
          Select Teammate
        </h2>
        <div className='flex flex-col items-center space-y-2'>
          <input 
            type='text'
            value={teammate}
            placeholder='Search for a teammate'
            className={mainInputBox}
            onChange={(e) => setTeammate(e.target.value)}
          />
          {teammateData && <img src={check} alt="check" className='w-[25px]'/>} {/* Render check asset when teammate is confirmed */}
          <button 
            onClick={() => handleConfirm(teammate, setTeammateData)} 
            className={`bg-light-green text-dark-green font-semibold py-1 px-4 rounded ${teammateData ? 'opacity-50' : ''}`} // Apply opacity when teammate is confirmed
            disabled={!!teammateData} // Disable button when teammate is confirmed
          >
            Confirm
          </button>
        </div>
        
        {/* Line divider */}
        <div className="border-t-2 border-white my-4"></div>  

        <h2 className={matchCreationFormHeader}>
          Select Opponents
        </h2>

        <div className='flex flex-col items-center space-y-2 pb-4'>
          <input
            type='text'
            value={opponent1}
            placeholder='Search for an opponent'
            className={mainInputBox}
            onChange={(e) => setOpponent1(e.target.value)}
          />
          {opponent1Data && <img src={check} alt="check" className='w-[25px]'/>} {/* Render check asset when opponent1 is confirmed */}
          <button 
            onClick={() => handleConfirm(opponent1, setOpponent1Data)}
            className={`bg-light-green text-dark-green font-semibold py-1 px-4 rounded ${opponent1Data ? 'opacity-50' : ''}`} // Apply opacity when opponent1 is confirmed
            disabled={!!opponent1Data} // Disable button when opponent1 is confirmed
          >
            Confirm
          </button>
        </div>
        <div className='flex flex-col items-center space-y-2'>
          <input
            type='text'
            value={opponent2}
            placeholder='Search for an opponent'
            className={mainInputBox}
            onChange={(e) => setOpponent2(e.target.value)}
          />
          {opponent2Data && <img src={check} alt="check" className='w-[25px]'/>} {/* Render check asset when opponent2 is confirmed */}
          <button 
            onClick={() => handleConfirm(opponent2, setOpponent2Data)}
            className={`bg-light-green text-dark-green font-semibold py-1 px-4 rounded ${opponent2Data ? 'opacity-50' : ''}`} // Apply opacity when opponent2 is confirmed
            disabled={!!opponent2Data} // Disable button when opponent2 is confirmed
          >
            Confirm
          </button>
        </div>
        {teammateData && opponent1Data && opponent2Data && (
          <button onClick={handleNext} className='py-4' >
            <h6 className='font-Inter font-semibold text-[14px] text-dark-green bg-light-green px-2 py-1 rounded-md'>
              Next
            </h6>
          </button>
        )}
      </div>
      <div className='fixed inset-x-0 bottom-6'>
        <NavBar />
      </div>
    </div>
  )
}

export default MatchCreation