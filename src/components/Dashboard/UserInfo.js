import React from 'react';

import DeadlineList from './DeadlineList';

export default function UserInfo(props) {
  return (
    <div className="user-info">

      <h1>User</h1>
      <img src="https://randomuser.me/api/portraits/men/73.jpg" className="user-avatar"></img>
      <h4>Welcome, #Name</h4>
      <div>
        Task Deadlines:
        <br />
        <div>
          <DeadlineList />
        </div>
      </div>
    </div>
  )
}