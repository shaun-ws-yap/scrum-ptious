import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

import DeadlineListItem from './DeadlineListItem';

export default function DeadlineList(props) {

  const allDeadlines = props.deadlines.map((deadline) => {
    return (
      <li className="deadlines-item">
      <DeadlineListItem
        key={deadline.id}
        title={deadline.title}
        description={deadline.description}
        due_date={deadline.due_date}
        creation_date={deadline.creation_date}
      />
      </li>
    )
  })

  return (
    <div className="deadlines">
      <ul>
        {allDeadlines}
      </ul>
    </div>
  )
}