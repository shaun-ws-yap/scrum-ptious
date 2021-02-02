import React, { useState } from 'react';

import DeadlineList from './DeadlineList';

import filterDeadlineTasks from '../../helpers/filterDeadlineTasks';

const roles = {
  1: "Project Manager",
  2: "Employee"
}

export default function UserInfo(props) {
  const { userInfo, tasks, teamUsers, transparent, selectedMenu } = props;
  const filteredTasks = filterDeadlineTasks(tasks);
  const [openFilter, setOpenFilter] = useState(false);

  const toggleFilter = (state) => {
    document.getElementById("team-list-filter").classList.toggle("change");
    
    return state ? setOpenFilter(false) : setOpenFilter(true);
  }

  return (
    <>
      <div className={`user-info-transparent-${transparent}${openFilter && selectedMenu === "Tasks" ? ' change' : ''}`}  id="user-panel-wings">
        { userInfo && ( 
          <>
            { userInfo.role === 1 && transparent === true && selectedMenu === "Tasks" && (
              <span 
                className="user-filter-btn"
                onClick={event => toggleFilter(openFilter)}
              >
                <i className="fas fa-filter fa-2x"></i>
              </span>
            )}
            <img alt={userInfo.name} src={userInfo.avatar} className="user-avatar"></img>
            <h5>Welcome, {userInfo.name}</h5>
            <h6>{roles[userInfo.role]}</h6>
            <p>Past Due</p>
            <div className="deadlines">
              <DeadlineList deadlines={filteredTasks} userInfo={userInfo} teamUsers={teamUsers} />
            </div>
            <div className="socials">
              <span><a href="https://github.com/clarchiu" target="_blank" rel="noreferrer"><i className="fab fa-github"></i><p>Clarence</p></a></span>
              <span><a href="https://github.com/Kevinli296" target="_blank" rel="noreferrer"><i className="fab fa-github"></i><p>Kevin</p></a></span>
              <span><a href="https://github.com/shaun-ws-yap" target="_blank" rel="noreferrer"><i className="fab fa-github"></i><p>Shaun</p></a></span>
            </div>
          </>
        )}
      </div>
    </>
  )
}