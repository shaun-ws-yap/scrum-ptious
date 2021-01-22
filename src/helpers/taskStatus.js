export function taskStatus (status, data) {
  let counter = 0;

  for (const index of data) {
    if (index.status === status) {
      counter += 1
    }
  }

  return counter;
}

export function lateTaskStatus (data) {
  let counter = 0;

  for (const index of data) {
    if (index.is_late === true) {
      counter += 1;
    }
  }

  return counter;
}

export function teamTaskStatus (data, team, empID) {
  let result = {
    assigned: 0,
    inProgress: 0,
    inReview: 0,
    late: 0,
    complete: 0
  };

  for (const index of data) {
    if (index.projecttask_id === team && index.employee_id === empID) {
      if (index.status === 0) {
        result.assigned += 1
      } else if (index.status === 1) {
        result.inProgress += 1;
      } else if (index.status === 2) {
        result.inReview += 1;
      } else if (index.status === 3) {
        result.complete += 1;
      }
      if (index.is_late === true) {
        result.late += 1;
      }
    }
  }

  return result;
}


export function changeTaskStatus (data) {

  data.status += 1;
  return data;

}