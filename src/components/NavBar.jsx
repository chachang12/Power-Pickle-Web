import { useNavigate, useLocation } from 'react-router-dom';
import { house, users, plus, list, person, court, id } from '../assets';
import { HomeIcon, ExploreIcon, CourtIcon, ProfileIcon } from './icons';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='fixed inset-x-0 bottom-6 flex justify-center'>
      <div className='flex flex-row justify-center space-x-8 backdrop-blur-md bg-opacity-30 bg-black w-[75%] rounded-full py-2 border border-white border-opacity-40'>
        <div className={location.pathname === '/home' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <HomeIcon color={location.pathname === '/home' ? 'black' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/home')} />        
        </div>
        <div className={location.pathname === '/explore' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <ExploreIcon color={location.pathname === '/explore' ? 'black' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/explore')} />
        </div>
        <div className={location.pathname === '/match-creation' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <CourtIcon color={location.pathname === '/match-creation' ? 'black' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/match-creation')} />
        </div>
        <div className={location.pathname === '/profile' ? 'p-1 rounded-full bg-white' : 'p-1 rounded-full border-transparent'}>
          <ProfileIcon color={location.pathname === '/profile' ? 'black' : 'white'} className='w-[35px] relative z-10' onClick={() => navigate('/profile')} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;