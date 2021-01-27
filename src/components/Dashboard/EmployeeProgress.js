import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

import EmployeeProgressItem from './EmployeeProgressItem';
import { teamTaskStatus } from '../../helpers/taskStatus';
import styled from 'styled-components';

export default function EmployeeProgress(props) {
  const [index, setIndex] = useState(0);
  
  const userData = props.teamUsers.filter(user => user.role !== 1).map((user) => {
  const taskData = teamTaskStatus(props.teamTasks, user.team_id, user.id);

    return (
      <TabPanel>
        <EmployeeProgressItem
          teamTasks={props.teamTasks}
          key={user.id}
          id={user.id}
          name={user.name}
          assigned={taskData.assigned}
          inProgress={taskData.inProgress}
          inReview={taskData.inReview}
          late={taskData.late}
          complete={taskData.complete}
        />
      </TabPanel>
    )
  })

  return (
    <Tabs defaultIndex={0} onSelect={index => setIndex(index)} className="employee-chart" >
      <TabList>
        { props.teamUsers.filter(user => user.role !== 1).map(user => {
          return (
            <Tab>{user.name}</Tab>
          )
        }) }
      </TabList>
      { userData }
    </Tabs>
  )
}