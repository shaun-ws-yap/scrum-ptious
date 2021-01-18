import React from 'react';

import DeadlineList from './DeadlineList';

const roles = {
  1: "Project Manager",
  2: "Employee"
}

export default function UserInfo(props) {
  return (
    <div className="user-info">

      { !props.userInfo && <h1>Please login with your user ID to continue</h1> }
      { props.userInfo && ( 
        <>
        <h1>User</h1> 
        <img src="https://randomuser.me/api/portraits/men/73.jpg" className="user-avatar"></img>
        <h4>{props.userInfo.name} </h4>
        <h5>{roles[props.userInfo.role]}</h5>
        <div>
          Task Deadlines:
          <br />
          <div>
            <DeadlineList />
          </div>
        </div>
        </>
        ) 
      }
      
    </div>
  )
}