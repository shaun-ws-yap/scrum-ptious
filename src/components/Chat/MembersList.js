import React from 'react';

import MembersListItem from "./MembersListItem";

const roles = ["Project Manager", "Developer"];

export default function MembersList(props) {
  const { teamUsers, onlineUsers } = props;

  const memberComponents = teamUsers.map(member => {
    const {id, name, role} = member;
    return (
      <MembersListItem 
        key={id}
        name={name} 
        role={roles[role-1]}
        avatar="https://randomuser.me/api/portraits/men/73.jpg"
        online={onlineUsers.includes(id)}
      />
    );
  })
  return (
    <div className="members-list">
      {memberComponents}
    </div>
  )
}