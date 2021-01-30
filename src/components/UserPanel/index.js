import React, { useState } from 'react';

import SlidingPanel from 'react-sliding-side-panel';
import 'react-sliding-side-panel/lib/index.css';

import UserInfo from './UserInfo';

import '../../styles/UserInfo.css';

export default function UserPanel(props) {
  const { userInfo, tasks, teamUsers, selectedMenu } = props;
  const [openPanel, setOpenPanel] = useState(false);

  const handleButton = (state) => {
    document.getElementById("user-hamburger").classList.toggle("change");
    return state ? setOpenPanel(false) : setOpenPanel(true);
  }
  
  return (
    <>
      <div>
        <div className="open-user-panel" id="user-hamburger" onClick={event => handleButton(openPanel)}>
          <div className="bar1">
          </div>
          <div className="bar2">
          </div>
          <div className="bar3">
          </div>
        </div>

        <div className="user-panel">
          <UserInfo
            userInfo={userInfo} 
            tasks={tasks} 
            teamUsers={teamUsers}
            transparent={true}
            selectedMenu={selectedMenu}
          />
        </div>
        <div className="hidden-user-panel">
          <SlidingPanel
            type={'right'}
            isOpen={openPanel}
            size={30}
          >
            <UserInfo
              userInfo={userInfo} 
              tasks={tasks} 
              teamUsers={teamUsers}
              transparent={false}
              selectedMenu={selectedMenu}
            /> 
          </SlidingPanel>
        </div>
      </div>
    </>
  )
} 