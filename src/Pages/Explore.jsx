import { NavBar, PowerPickleIcon } from '../components'
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
    const lowerCaseSearch = search.toLowerCase()
    const searchedUsers = await searchUsers(lowerCaseSearch)
    setUsers(searchedUsers) // update state with the found users
    
    searchedUsers.forEach(searchedUser => {
        console.log("Search Results: " + searchedUser.id); // Log the user id
      });
  }

  return (
    <div className='flex flex-col justify-center items-center pt-4'>
      <h1 className='font-inter text-dark-blue text-[20px] font-semibold pb-4'>
        Explore
      </h1>
      <div className='pb-6'>
        <PowerPickleIcon color={'#011C40'}/>
      </div>
      <div className='w-full px-4'>
        <form onSubmit={handleSubmit}>
          <input 
            name="search"
            type="text"
            placeholder="Search"
            className='bg-off-white w-full py-2 rounded-md pl-3 font-Inter placeholder-dark-blue font-light'
            onChange={handleInputChange}
          />
        </form>
      </div>
      {users.map(searchedUser => <UserCard key={searchedUser.username} searchedUser={searchedUser} user={user} />)} {/* pass the user context as a prop */}
      <div className='fixed inset-x-0 bottom-6'>
        <NavBar />
      </div>
    </div>
  )
}

export default Explore