import React from 'react';

import MembersListItem from "./MembersListItem";
import styled from 'styled-components';

const roles = ["Project Manager", "Developer"];

export default function MembersList(props) {
  const { teamUsers, onlineUsers } = props;

  const MemberList = styled.div`
  background: ${props => props.theme.memberListBackground};
  color: ${props => props.theme.chatBoxFontColor};
  `;

  const memberComponents = teamUsers.map(member => {
    const {id, name, role, avatar} = member;
    return (
      <MembersListItem 
        key={id}
        name={name} 
        role={roles[role-1]}
        avatar={avatar}
        online={onlineUsers.includes(id)}
      />
    );
  })
  return (
    // <div className="members-list">
    <MemberList className="members-list">
      {memberComponents}
    </MemberList>
    /* </div> */
  )
}