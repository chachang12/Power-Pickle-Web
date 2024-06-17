import React from 'react';
import { useNavigate } from 'react-router-dom';
import { homeicon, searchicon, profileicon, plusicon, tournamenticon } from '../assets';

const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-row justify-center space-x-4'>
      <img src={searchicon} alt="Search" className='w-[50px]' onClick={() => navigate('/explore')} />
      <img src={plusicon} alt="Create" className='w-[50px]' onClick={() => navigate('/matchcreation')} />
      <img src={homeicon} alt="Home" className='w-[50px]' onClick={() => navigate('/home')} />
      <img src={tournamenticon} alt="Tournament" className='w-[50px]' onClick={() => navigate('/tournament')} />
      <img src={profileicon} alt="Profile" className='w-[50px]' onClick={() => navigate('/profile')} />
    </div>
  );
};

export default NavBar;