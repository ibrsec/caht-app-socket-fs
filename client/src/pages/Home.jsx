import React, { useEffect } from 'react'
import SideBar from '../components/sidebar/SideBar'
import MessageContainer from '../components/messageContainer/MessageContainer' 
import useSocket from '../services/useSocket'
import { useSelector } from 'react-redux'

const Home = () => { 
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-300 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-green-600'>
      <SideBar/>
      <MessageContainer />
    </div>
  )
}

export default Home