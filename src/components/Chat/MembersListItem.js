import React from 'react';

export default function MembersListItem(props) {
  const { name, role, avatar } = props;
  return (
    <div className="members-list-item">
      <img src={avatar} alt= "User Avatar" className="user-avatar"></img>
      <div>
        <div>{name}</div>
        <div>{role}</div>
      </div>
    </div>
  )
}