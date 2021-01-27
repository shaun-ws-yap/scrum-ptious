import React from 'react';

export default function MyTeamItem(props) {
  const {
    member,
    selectTasksByUser,
  } = props;

  const { role, name, avatar, email, phone_number } = member;

  const roles = {
    1 : 'Project Manager',
    2 : 'Employee'
  }

  return (
    <div 
      className='my-team-item'
      onClick={() => selectTasksByUser(member)}
    >
      <img src={avatar} alt= "User Avatar" className='my-team-item-avatar'></img>
      <div className='my-team-item-right'>
        <div className='my-team-item-name'>{name}</div>
        <div className='my-team-item-details'>{roles[role]}</div>
        <div className='my-team-item-details'>{email}</div>
        <div className='my-team-item-details'>{phone_number}</div>
      </div>
    </div>
  )
}