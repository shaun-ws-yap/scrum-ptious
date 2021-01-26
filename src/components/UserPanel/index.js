import React, { useState} from 'react';

import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';

import UserInfo from './UserInfo';
import useSidePanel from '../../hooks/useSidePanel';

import '../../styles/UserInfo.css';

export default function UserPanel(props) {
  const { userInfo, tasks, teamUsers } = props;

  const {
    windowWidth,
    openPanel,
    setOpenPanel,
  } = useSidePanel()

  if (windowWidth > 1300) {
    return (
      <UserInfo
        userInfo={userInfo} 
        tasks={tasks} 
        teamUsers={teamUsers} 
      /> 
    )
  } else {
    return (
      <div>
        {!openPanel && <button className="user-info closed" onClick={() => setOpenPanel(true)}>Open</button>}
        <SlidingPanel
          type={'right'}
          isOpen={windowWidth < 1300 && openPanel}
          size={30}
        >
          <button onClick={() => setOpenPanel(false)}>close</button>
          <UserInfo
            userInfo={userInfo} 
            tasks={tasks} 
            teamUsers={teamUsers} 
          /> 
      </SlidingPanel>
    </div>)
  }



} 