import React from 'react';

import MembersListItem from "./MembersListItem";

const roles = ["Project Manager", "Developer"];

export default function MembersList(props) {
  const { teamUsers } = props;
  const memberComponents = teamUsers.map(member => {
    const {id, name, role} = member;
    return (
      <MembersListItem 
        key={id}
        name={name} 
        role={roles[role-1]}
        avatar="https://randomuser.me/api/portraits/men/73.jpg"
      />
    );
  })
  return (
    <div className="members-list">
      <h2>Members List</h2>
      {memberComponents}
    </div>
  )
}