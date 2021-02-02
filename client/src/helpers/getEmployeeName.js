export function getEmployeeName (data, empID) {
  let result = '';

  for (const index of data) {
    if (index.id === empID) {
      result = index.name;
    }
  }
  return result;
}