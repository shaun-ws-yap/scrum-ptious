import React from 'react';

import MembersListItem from "./MembersListItem";

const members = [
  {
    id: 1,
    name: "Andy Lindsay",
    email: "andy.lindsay@hotmail.com",
    phone_number: "778-823-1085",
    role: 1,
    team_id: 1,
    team_name: "Super Team 1"
  },
  {
    id: 2,
    name: "Aaron Dufall",
    email: "aaron.dufall@hotmail.com",
    phone_number: "604-338-1955",
    role: 2,
    team_id: 1,
    team_name: "Super Team 1"
  }
];

const roles = ["Project Manager", "Developer"];

export default function MembersList(props) {
  const memberComponents = members.map(member => {
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