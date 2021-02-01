import React from 'react';

export default function MyTeamItem(props) {
  const {
    member,
    selectTasksByUser,
  } = props;

  const { role, name, avatar } = member;

  return (
    <div 
      className='my-team-item'
      onClick={() => selectTasksByUser(member)}
    >
      <img src={avatar} alt= "User Avatar" className='my-team-item-avatar'></img>
      <div className='my-team-item-right'>
        <div className='my-team-item-name'>{role === 1 ? 'Show All' : name}</div>

        {/* <div className='my-team-item-details'>{roles[role]}</div>
        <div className='my-team-item-details'>{email}</div>
        <div className='my-team-item-details'>{phone_number}</div> */}

      </div>
    </div>
  )
}