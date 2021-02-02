import '../../styles/Sidebar.css';

import React from 'react';

import SidebarItem from './SidebarItem';
import NewTaskItem from '../Tasks/NewTaskItem';

export default function Sidebar(props) {
  const {
    selectedMenu,
    userInfo,
    teamUsers,
    setMenu,
    createTaskItem,
    error,
    setErrorNotification
  } = props

  const menuItems = userInfo.role === 1 ? 
    ['Dashboard', 'Tasks', 'Chat','Submissions'] : 
    ['Dashboard', 'Tasks', 'Chat'];

  return (
    <ul>
    { menuItems.map((item, index) => {
      return (
        <SidebarItem
          key={index}
          name={item}
          selected={selectedMenu === item}
          setMenu={setMenu}
        />)
      })}
      { userInfo.role === 1 && (
        <div key={4}>
          <NewTaskItem
            team={userInfo.team_id}
            teamUsers={teamUsers} 
            createTaskItem={createTaskItem} 
            error={error}
            setErrorNotification={setErrorNotification}
          />
        </div>
      )}
    </ul>
  )
}