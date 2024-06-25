import React, { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { NavBar } from '../components'
import { calculateMMR } from '../utils'
import { ConfirmationIcon } from '../components'
import { UserContext } from '../UserContext'
import { createMatch, updateUserMMR, incrementUserWins } from '../firestoreQueries'
import { MatchModel } from '../models'

const MatchConfirmation = () => {
    const navigate = useNavigate();
    const { userData } = useContext(UserContext);
    const location = useLocation();
    const { teammate, opponent1, opponent2 } = location.state;

    const [team1score, setTeam1Score] = useState(0);
    const [team2score, setTeam2Score] = useState(0);

    const [team1, setTeam1] = useState([userData.id, teammate.id]);
    const [team2, setTeam2] = useState([opponent1.id, opponent2.id]);

    const currentDate = new Date();

    const handleConfirmMatch = async () => {
        if (team1score > 10 && team2score > 10) {
            if (Math.abs(team1score - team2score) < 2) {
                alert("Winner must win by two points");
                return;
            }
        }

        const mmrChanges = calculateMMR(team1score, team2score, userData, teammate, opponent1, opponent2);
    
        const match = new MatchModel({
            team1PlayerIds: [userData.id, teammate.id],
            team2PlayerIds: [opponent1.id, opponent2.id],
            team1score: team1score,
            team2score: team2score,
            winnerIds: team1score > team2score ? team1 : team2,
            date: currentDate,
            mmrChanges: mmrChanges
            
        });
        await createMatch(match.toObject());
        await updateUserMMR(userData.id, mmrChanges[userData.id]);
        await updateUserMMR(teammate.id, mmrChanges[teammate.id]);
        await updateUserMMR(opponent1.id, mmrChanges[opponent1.id]);
        await updateUserMMR(opponent2.id, mmrChanges[opponent2.id]);
        if (team1score > team2score) {
            await incrementUserWins(userData.id);
            await incrementUserWins(teammate.id);
        } else {
            await incrementUserWins(opponent1.id);
            await incrementUserWins(opponent2.id);
        }
        alert("Match confirmed!");
        navigate('/home');
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
                        className='w-[50px] bg-off-white p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light opacity-80'
                        value={team1score}
                        onChange={(e) => setTeam1Score(parseInt(e.target.value, 10))}
                    >
                    </input>
                    </div>

                    <div className='flex flex-col items-center'>
                    <input 
                        className='w-[50px] bg-off-white p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light opacity-80'
                        value={team2score}
                        onChange={(e) => setTeam2Score(parseInt(e.target.value, 10))}
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
            <h6 className='font-Inter font-regular text-[14px] text-white bg-dark-green px-2 py-1 rounded-md'>
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