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