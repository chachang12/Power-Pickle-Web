import React, { useState } from 'react';
import { pickleLogo, arrow } from '../assets';
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../firebase'; // adjust the import path as needed

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const user = await signUp(email, password, username, firstName, lastName, phoneNumber);
      console.log('User signed up:', user);

      // Navigate to the home page
      navigate('/home');
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col items-center py-10'>
      <img src={pickleLogo} alt="pickle logo" className='w-[100px]'/>
      <h1 className='font-inter text-light-green text-[46px] font-semibold py-10'>
          Register
      </h1>
      <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
      />
      <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
      />
      <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
      />
      <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
      />
      <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
      />
      <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
      />
      <button type="submit" className='py-4'>
          <h6 className='font-Inter font-semibold text-[14px] text-dark-green bg-light-green px-2 py-1 rounded-md'>
              Register
          </h6>
      </button>
      <div className='flex flex-row'>
          <Link to="/login">
              <h6 className='font-Inter font-semibold text-[8px] text-light-green'>
                  Already have an account? Login
              </h6>
          </Link>
          <img src={arrow} alt="arrow" className='w-[5px] ml-1'/>
      </div>
    </form>
  );
}

export default Register;