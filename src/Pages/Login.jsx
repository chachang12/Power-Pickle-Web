import React, { useContext } from 'react';
import { UserContext } from '../UserContext';
import { useNavigation, useNavigate } from 'react-router-dom';
import { pickleLogo, arrow } from '../assets';
import { PowerPickleIcon } from '../components';
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
    <div className='flex flex-col items-center pt-10 min-h-screen'>
      <div>
        <PowerPickleIcon color={'#011C40'} />
      </div>
      <h1 className='font-Inter text-off-white text-[46px] font-semibold py-10'>
        Login
      </h1>
      <div className='flex flex-col flex-grow w-full'>
        <div className='bg-off-white rounded-t-3xl w-full flex flex-col items-center flex-grow'>
          <form onSubmit={handleLogin} className='flex flex-col items-center w-[85%]'>
              <div className='flex flex-col flex-grow w-[100%] pt-4'>
                <input
                  name="email"
                  type="text"
                  placeholder="Email"
                  className='bg-dark-blue p-3 rounded-xl text-white my-2 font-Inter placeholder-white font-light'
                />
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  className='bg-dark-blue p-3 rounded-xl text-white my-2 font-Inter placeholder-white font-light'
                />
              </div>
            
            <button type="submit" className='py-4'>
              <h6 className='font-Inter font-medium text-[14px] text-white bg-dark-blue px-4 py-2 rounded-xl'>
                Login
              </h6>
            </button>
          </form>
          <div className='flex flex-row'>
            <Link to="/register">
              <h6 className='font-Inter font-semibold text-[10px] text-dark-blue'>
                Don’t have an account? Join today!
              </h6>
            </Link>
            <img src={arrow} alt="arrow" className='w-[5px] ml-1'/>
          </div>
        </div>
      </div>
      
      
    </div>
  );
};

export default Login;