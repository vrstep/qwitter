import React from 'react'
import LeftSidebar from '../components/LeftSidebar'
import Profile from '../components/Profile'
import RightSidebar from '../components/RightSidebar'

function ProfilePage() {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="max-w-screen-xl w-full h-full flex relative">
        <LeftSidebar />
        <Profile />
        <RightSidebar />
      </div>
    </div>
  )
}

export default ProfilePage