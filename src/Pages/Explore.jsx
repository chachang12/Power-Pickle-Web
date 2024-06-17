import { NavBar } from '../components'
import { pickleLogo } from '../assets'
import { searchUsers } from '../firestoreQueries.js'
import UserCard from '../components/UserCard'
import { UserContext } from '../UserContext' // import UserContext
import React, { useState, useContext } from 'react';

const Explore = () => {
  const [search, setSearch] = useState('')
  const [users, setUsers] = useState([])
  const { user } = useContext(UserContext);

  const handleInputChange = (event) => {
    setSearch(event.target.value)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const searchedUsers = await searchUsers(search)
    setUsers(searchedUsers) // update state with the found users
    
    searchedUsers.forEach(searchedUser => {
        console.log("Search Results: " + searchedUser.id); // Log the user id
      });
  }

  return (
    <div className='flex flex-col justify-center items-center pt-8'>
      <img src={pickleLogo} className='w-[100px] pb-4'/>
      <form onSubmit={handleSubmit}>
        <input 
          name="search"
          type="text"
          placeholder="Search"
          className='bg-light-green px-12 py-2 rounded-md my-2 font-Inter placeholder-dark-green font-light'
          onChange={handleInputChange}
        />
      </form>
      {users.map(searchedUser => <UserCard key={searchedUser.username} searchedUser={searchedUser} user={user} />)} {/* pass the user context as a prop */}
      <div className='fixed inset-x-0 bottom-6'>
        <NavBar />
      </div>
    </div>
  )
}

export default Explore