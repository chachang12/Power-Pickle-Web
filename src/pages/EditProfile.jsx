import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadImageAndGetURL, getUserData, updateUserData, logout } from '../firebase';
import { tempprofile, logouticon } from '../assets';
import { UserContext } from '../UserContext.js';

const EditProfile = () => {
  const { userData, setUserData } = useContext(UserContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      try {
        const downloadURL = await uploadImageAndGetURL(selectedFile);
        await updateUserData(downloadURL);
        const updatedUserData = await getUserData();
        setUserData(updatedUserData);
        navigate('/profile');
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div className='flex flex-col items-center mt-12 w-full h-screen'>
      <div className="flex flex-row justify-center space-x-10 pb-4">
        <img src={userData.profilePicture ? userData.profilePicture : tempprofile} alt="profileimage" className="rounded-full w-[150px] h-[150px] object-cover shadow-lg" />
      </div>
      <h1 className='font-Inter text-dark-blue text-[28px] font-semibold pb-2'>
        {userData.username}
      </h1>
      <div className="w-3/4 max-w-md">
        <input type="file" onChange={handleImageChange} className="form-input mb-4" />
        <div className='flex flex-col space-y-2'>
          <button onClick={handleImageUpload} className="bg-dark-blue text-white font-medium py-2 px-4 rounded-xl ">Save Changes</button>
          <button onClick={() => navigate('/profile')} className="bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-xl">Cancel</button>
          <button onClick={logout} className="bg-red-700 text-white font-medium py-2 px-4 rounded-xl flex flex-col items-center">
            <div className='flex flex-row items-center space-x-2'>
              <h1>
                Logout
              </h1>
              <img src={logouticon} className='w-[20px]'/>
            </div>
            
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;