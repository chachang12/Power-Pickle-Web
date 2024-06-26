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
        // Enforces that overtime games are won by 2 points
        if (team1score > 10 && team2score > 10) {
            if (Math.abs(team1score - team2score) < 2) {
                alert("Winner must win by two points");
                return;
            }
        }

        // Enforces that normal games have a winner at 11 points
        if (Math.abs(team1score - team2score) > 2) {
            if (!(team1score === 11 || team2score === 11)) {
                alert("Game must end at 11");
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
            <div className="border-l-4 border-white h-[200px] mx-2 rounded-lg"></div>
            <ConfirmationIcon player={teammate}/>
        </div>

        <div className='border-t-4 white w-[90%] my-1 rounded-lg'></div>

        <div className='py-4'>
            <form className='flex flex-row space-x-6'>
                <div className='flex flex-col items-center'>
                    <h2 className='font-Inter text-white'>
                        Team 1 Score
                    </h2>
                    <input 
                        className='w-[50px] bg-dark-blue text-white p-2 rounded-md my-2 font-Inter font-light'
                        value={team1score}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (isNaN(value)) {
                                setTeam1Score(''); // Reset the box to nothing if a non-number is entered
                            } else {
                                setTeam1Score(value);
                            }
                        }}
                    />
                </div>
                <button className='py-4' onClick={handleConfirmMatch} >
                    <h6 className='font-Inter font-regular text-[14px] text-white bg-dark-blue px-3 py-2 rounded-xl '>
                        Confirm<br />
                        Match
                    </h6>
                </button>
                <div className='flex flex-col items-center'>
                    <input 
                        className='w-[50px] bg-dark-blue text-white p-2 rounded-md my-2 font-Inter font-light'
                        value={team2score}
                        onChange={(e) => {
                            const value = parseInt(e.target.value, 10);
                            if (isNaN(value)) {
                                setTeam2Score(''); // Reset the box to nothing if a non-number is entered
                            } else {
                                setTeam2Score(value);
                            }
                        }}
                    />
                    <h2 className='font-Inter text-white'>
                        Team 2 Score
                    </h2>
                </div>
            </form>
        </div>
        

        <div className='border-t-4 white w-[90%] my-1'></div>

        <div className='flex flex-row space-x-12 items-center'>
            <ConfirmationIcon player={opponent1}/>
            <div className="border-l-4 border-white h-[200px] mx-2 rounded-lg"></div>
            <ConfirmationIcon player={opponent2}/>
        </div>        
        <div className='fixed inset-x-0 bottom-6'>
          <NavBar />
        </div>
    </div>
  )
}

export default MatchConfirmation