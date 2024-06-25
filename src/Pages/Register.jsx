import React, { useState, useContext } from 'react';
import { pickleLogo, arrow } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../firebase'; // adjust the import path as needed
import { UserContext } from '../UserContext';
import { PowerPickleIcon, Arrow } from '../components';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [mmr, setMmr] = useState(500); // default value is 500
  const [profilePicture, setProfilePicture] = useState(''); // default value is an empty string
  const [matchesPlayed, setMatchesPlayed] = useState(0); // default value is 0
  const [wins, setWins] = useState(0); // default value is 0
  const [friends, setFriends] = useState([]); // default value is an empty array

  const navigate = useNavigate();
  const { setUserContext } = useContext(UserContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signUp(email, password, username, firstName, lastName, phoneNumber, mmr, profilePicture, matchesPlayed, wins, friends);
      console.log('User signed up:', user);

      // Set the UserContext
      setUserContext(user);

      // Navigate to the home page
      navigate('/home');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  // Register.jsx updated form and styling to match Login.jsx style
return (
  <div className='flex flex-col items-center pt-10 min-h-screen'>
    <div>
      <PowerPickleIcon color={'#011C40'} />
    </div>
    <h1 className='font-Inter text-off-white text-[46px] font-semibold py-10'>
      Register
    </h1>
    <div className='flex flex-col flex-grow w-full'>
      <div className='bg-off-white rounded-t-3xl w-full flex flex-col items-center flex-grow'>
        <form onSubmit={handleSubmit} className='flex flex-col items-center w-[85%]'>
            <div className='flex flex-col flex-grow w-[100%] pt-4'>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                className='bg-dark-blue p-3 rounded-xl text-white my-2 font-Inter placeholder-white font-light'
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                className='bg-dark-blue p-3 rounded-xl text-white my-2 font-Inter placeholder-white font-light'
              />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className='bg-dark-blue p-3 rounded-xl text-white   my-2 font-Inter placeholder-white font-light'
              />
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className='bg-dark-blue p-3 rounded-xl text-white   my-2 font-Inter placeholder-white font-light'
              />
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Phone Number"
                className='bg-dark-blue p-3 rounded-xl text-white   my-2 font-Inter placeholder-white font-light'
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className='bg-dark-blue p-3 rounded-xl text-white   my-2 font-Inter placeholder-white font-light'
              />
            </div>
          
          <button type="submit" className='py-4'>
            <h6 className='font-Inter font-medium text-[14px] text-white bg-dark-blue px-4 py-2 rounded-xl'>
              Register
            </h6>
          </button>
        </form>
        <div className='flex flex-row items-center'>
          <Link to="/login">
            <h6 className='font-Inter font-semibold text-[10px] text-dark-blue pr-1'>
              Already have an account? Login
            </h6>
          </Link>
          <div>
            <Arrow width={8} height={8} color={'#011C40'} />
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default Register;