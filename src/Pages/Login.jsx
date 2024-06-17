import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigation, useNavigate } from 'react-router-dom';
import { pickleLogo, arrow } from '../assets';
import { Link } from 'react-router-dom';
import { signIn } from '../firebase';

const Login = () => {
  const navigate = useNavigate();
  const { setUserContext } = useContext(UserContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      const user = await signIn(email.value, password.value);
      if (user) {
        setUserContext(user);
        navigate("/home");
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className='flex flex-col items-center py-10'>
      <img src={pickleLogo} alt="pickle logo" className='w-[100px]'/>
      <h1 className='font-Inter text-light-green text-[46px] font-semibold py-10'>
        Login
      </h1>
      <form onSubmit={handleLogin} className='flex flex-col'>
        <input
          name="email"
          type="text"
          placeholder="Email"
          className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className='bg-light-green p-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
        />
        <button type="submit" className='py-4'>
          <h6 className='font-Inter font-semibold text-[14px] text-dark-green bg-light-green px-2 py-1 rounded-md'>
            Login
          </h6>
        </button>
      </form>
      <div className='flex flex-row'>
        <Link to="/register">
          <h6 className='font-Inter font-semibold text-[8px] text-light-green'>
            Don’t have an account? Join today!
          </h6>
        </Link>
        <img src={arrow} alt="arrow" className='w-[5px] ml-1'/>
      </div>
    </div>
  );
};

export default Login;