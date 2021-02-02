import React, { useState } from 'react';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';

import EmployeeProgressItem from './EmployeeProgressItem';
import { teamTaskStatus } from '../../helpers/taskStatus';

export default function EmployeeProgress(props) {
  const [tabIndex, setTabIndex] = useState(0);
  
  const userData = props.teamUsers.filter(user => user.role !== 1).map((user) => {
    const taskData = teamTaskStatus(props.teamTasks, user.team_id, user.id);

    return (
      <TabPanel key={user.id}>
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
    <Tabs defaultIndex={0} onSelect={index => setTabIndex(tabIndex)} className="employee-chart" >
      <TabList>
        { props.teamUsers.filter(user => user.role !== 1).map(user => {
          return (
            <Tab key={user.id}>{user.name}</Tab>
          )
        }) }
      </TabList>
      { userData }
    </Tabs>
  )
}