import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { PowerPickleIcon } from '../components';
import { pickleballstock, carsonlogo } from '../assets';
import arrow from '../assets/arrow.svg';

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  return (
    <div className='relative flex flex-col items-center h-screen'>
        <div className="h-2/3 relative">
            <img src={pickleballstock} className="h-full w-full object-cover" />
            <div className="absolute top-[75px] left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <PowerPickleIcon color={"#011C40"} />
            </div>
        </div>
        <div className='relative flex flex-grow w-full'>
            <div className='bg-matcha-green rounded-t-xl p-6 mt-[-40px] w-full z-10 '>
                <div className='flex flex-col items-center space-y-4 pt-4'>
                    <div className='flex flex-row items-center bg-[#011C40] text-white font-extralight py-4 px-14 rounded-3xl'>
                        <button className='pr-4' onClick={() => navigate('/register')}>
                            Create a new account
                        </button>
                        <img src={arrow} className='w-3'/>
                    </div>
                   
                    <button className='text-white pb-2' onClick={() => navigate('/login')}>
                        I already have an account
                    </button>
                    <div className='w-full border-t-2 border-white my-4 pb-2'></div> 
                        <div className='flex flex-col items-center'>
                            <a href="http://carsonchangdev25.com" target="_blank" rel="noopener noreferrer" className='flex flex-col items-center w-full text-center'>
                                <div className='flex flex-row items-center pb-4'>
                                    <h1 className='text-white pr-2'>
                                        About the project
                                    </h1>
                                    <img src={arrow} className='w-3'/>
                                </div>
                                
                                <img src={carsonlogo} className='w-[50px]'/>
                            </a>
                        </div>
                    </div>
            </div>
        </div>
    </div>
  );
}

export default LandingPage;