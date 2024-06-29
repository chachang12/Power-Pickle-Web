import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Login, Register, Home, Profile, EditProfile, Explore, MatchCreation, MatchConfirmation, Friends, LandingPage, FriendProfile } from './pages';
import { db, app, analytics, auth, getUserData } from './firebase';
import { UserContext } from './UserContext';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const setUserContext = async (user) => {
    setUser(user);
    if (user) {
      try {
        const data = await getUserData();
        setUserData(data);
      } catch (error) {
        setError(error.message);
      }
    } else {
      setUserData(null);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserContext(user);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{user, userData, setUserContext, setUserData, error}}>
      <Router>
        <Routes>
          
          <Route path="/" element={user ? <Navigate to="/home" /> : <LandingPage />} />
          <Route path="/register" element={user ? <Navigate to="/home" /> : <Register />} />
          <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
          <Route path="/home" element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/editprofile" element={user ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/explore" element={user ? <Explore /> : <Navigate to="/login" />} />
          <Route path="/match-creation" element={user ? <MatchCreation /> : <Navigate to="/login" />} />
          <Route path="/match-confirmation" element={user ? <MatchConfirmation /> : <Navigate to="/login" />} />
          <Route path="friends" element={user ? <Friends /> : <Navigate to="/login" />} />
          <Route path="friend-profile" element={user ? <FriendProfile /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;