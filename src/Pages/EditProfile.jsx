import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { uploadImageAndGetURL, getUserData, updateUserData, logout } from '../firebase';
import { tempprofile } from '../assets';
import { UserContext } from '../UserContext.js';

const EditProfile = () => {
  const { userData, setUserData } = useContext(UserContext); // Get setUserData from context
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate(); // Get navigate function

  const handleImageChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (selectedFile) {
      try {
        const downloadURL = await uploadImageAndGetURL(selectedFile);
        await updateUserData(downloadURL); // Only pass downloadURL
        const updatedUserData = await getUserData();
        setUserData(updatedUserData); // Update user data in context
        navigate('/profile'); // Navigate back to profile page
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.log('No file selected');
    }
  };

  return (
    <div className='flex flex-col items-center mt-12'>
      <div className="flex flex-row space-x-10 pb-4">
        <img src={userData.profilePicture ? userData.profilePicture : tempprofile} alt="profileimage" className="rounded-full w-[150px] h-[150px] bg-[#808080]" />
      </div>
      <h1 className='font-Inter text-white text-[28px] font-semibold pb-2'>
        {userData.username}
      </h1>
      <div>
        <input type="file" onChange={handleImageChange} />
        <div className='flex flex-col'>
          <button onClick={handleImageUpload}>Save Changes</button>
        <button onClick={() => navigate('/profile')}>Cancel</button> {/* Cancel button */}
        </div>
        
      </div>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

export default EditProfile;