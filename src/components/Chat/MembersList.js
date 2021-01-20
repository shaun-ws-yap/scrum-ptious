import React from 'react';

import MembersListItem from "./MembersListItem";

const roles = ["Project Manager", "Developer"];

const reorderArray = (arr, from, to) => {
  arr.splice(to, 0, this.splice(from, 1)[0]);
}

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