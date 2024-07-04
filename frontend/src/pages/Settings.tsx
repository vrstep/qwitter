import React from 'react'
import LeftSidebar from '../components/LeftSidebar'
import SettingsMenu from '@/components/SettingsMenu'

function Settings() {
  return (
    <div className="w-full h-full flex justify-center items-center relative">
      <div className="max-w-screen-xl w-full h-full flex relative">
        <LeftSidebar />
        <SettingsMenu/>
      </div>
    </div>
  )
}

export default Settings