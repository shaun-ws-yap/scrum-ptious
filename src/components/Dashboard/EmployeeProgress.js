import React, { useState } from 'react';
import { teamTaskStatus } from '../../helpers/taskStatus';
import EmployeeProgressItem from './EmployeeProgressItem';

import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

export default function EmployeeProgress(props) {
  const [index, setIndex] = useState(0);

  const userData = props.teamUsers.filter(user => user.role !== 1).map((user) => {
    const taskData = teamTaskStatus(props.teamTasks, user.team_id, user.id);

    return (
      <TabPanel>
        <EmployeeProgressItem
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
    
    <Tabs defaultIndex={0} onSelect={index => setIndex(index)}>
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