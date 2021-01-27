import React from 'react';

import MyTeamItem from './MyTeamItem';
import styled from 'styled-components';
import '../../styles/MyTeam.css';

export default function MyTeam(props) {
  const {
    selectTasksByUser,
    teamUsers,
  } = props;

  const TeamList = styled.div`
  background: ${props => props.theme.myTeamBackground};
  color: ${props => props.theme.chatBoxFontColor};
  `;

  const teamMembers = teamUsers.map((member) => {
    return (
    <MyTeamItem
      key={member.id}
      member={member}
      selectTasksByUser={selectTasksByUser}
    />
    )
  })

  return (
    <TeamList className="team-list">
      {teamMembers}
    </TeamList>
  )
}