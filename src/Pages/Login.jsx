import React from 'react'
import { pickleLogo, arrow } from '../assets'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='flex flex-col items-center py-10'>
        <img src={pickleLogo} alt="pickle logo" className='w-[100px]'/>
        <h1 className='font-inter text-light-green text-[46px] font-semibold py-10'>
            Login
        </h1>
        <input
            type="text"
            placeholder="Username"
            className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
        />
        <input
            type="password"
            placeholder="Password"
            className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
        />
        <button className='py-4'>
            <h6 className='font-Inter font-semibold text-[14px] text-dark-green bg-light-green px-2 py-1 rounded-md'>
                Login
            </h6>
        </button>
        <div className='flex flex-row'>
            <Link to="/register">
                <h6 className='font-Inter font-semibold text-[8px] text-light-green'>
                    Don’t have an account? Join today!
                </h6>
            </Link>
            <img src={arrow} alt="arrow" className='w-[5px] ml-1'/>
        </div>
    </div>
  )
}

export default Login