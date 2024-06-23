import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { NavBar } from '../components'
import { getRankImage } from '../utils'
import { ConfirmationIcon } from '../components'
import { UserContext } from '../UserContext'
import { createMatch } from '../firestoreQueries'
import { MatchModel } from '../models'

const MatchConfirmation = () => {
    const { userData } = useContext(UserContext);
    const location = useLocation();
    const { teammate, opponent1, opponent2 } = location.state;

    const [team1score, setTeam1Score] = useState(0);
    const [team2score, setTeam2Score] = useState(0);

    const [team1, setTeam1] = useState([userData.id, teammate.id]);
    const [team2, setTeam2] = useState([opponent1.id, opponent2.id]);

    const handleConfirmMatch = async () => {
        if (team1score > 10 && team2score > 10) {
            if (Math.abs(team1score - team2score) < 2) {
                alert("Winner must win by two points");
                return;
            }
        }
    
        const match = new MatchModel({
            team1: [userData.id, teammate.id],
            team2: [opponent1.id, opponent2.id],
            team1score: team1score,
            team2score: team2score,
            winnerIds: team1score > team2score ? team1 : team2,
            
        });
        await createMatch(match);
    }

  return (
    <div className='flex flex-col items-center pt-4'>
        <div className='flex flex-row space-x-12 items-center'>
            <ConfirmationIcon player={userData}/>
            <div className="border-l-4 border-white h-[250px] mx-2 rounded-lg"></div>
            <ConfirmationIcon player={teammate}/>
        </div>

        <div className='border-t-4 white w-[90%] my-2 rounded-lg'></div>

        <div className='py-8'>
            <form className='flex flex-row space-x-12'>
                <div className='flex flex-col items-center'>
                    <h2 className='font-Inter text-white'>
                        Team 1 Score
                    </h2>
                    <input 
                        placeholder='0' 
                        className='w-[50px] bg-white p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light opacity-50'
                        value={team1score}
                        onChange={(e) => setTeam1Score(e.target.value)}
                    >
                    </input>
                    </div>

                    <div className='flex flex-col items-center'>
                    <input 
                        placeholder='0' 
                        className='w-[50px] bg-white p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light opacity-50'
                        value={team2score}
                        onChange={(e) => setTeam2Score(e.target.value)}
                    >
                    </input>
                    <h2 className='font-Inter text-white'>
                        Team 2 Score
                    </h2>
                </div>
            </form>
        </div>
        

        <div className='border-t-4 white w-[90%] my-2'></div>

        <div className='flex flex-row space-x-12 items-center'>
            <ConfirmationIcon player={opponent1}/>
            <div className="border-l-4 border-white h-[250px] mx-2 rounded-lg"></div>
            <ConfirmationIcon player={opponent2}/>
        </div>
        {/* Route back home, show some sign of confirmation. */}
        <button className='py-4' onClick={handleConfirmMatch} >
            <h6 className='font-Inter font-semibold text-[14px] text-dark-green bg-light-green px-2 py-1 rounded-md'>
                Confirm Match
            </h6>
        </button>
        <div className='fixed inset-x-0 bottom-6'>
          <NavBar />
        </div>
    </div>
  )
}

export default MatchConfirmation