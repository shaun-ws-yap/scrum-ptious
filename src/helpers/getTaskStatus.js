export default function getTaskStatus(status) {
  switch(status) {
    case 0: 
      return { status: "Assigned", type: "info" }
      break;
    case 1:
      return { status: "In Progress", type: "primary" }
      break;
    case 2:
      return { status: "In Review", type: "warning" }
      break;
    case 3:
      return { status: "Completed", type: "success" }
      break;
  }
}