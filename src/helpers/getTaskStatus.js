export default function getTaskStatus(status) {
  switch(status) {
    case 0: 
      return { status: "Assigned", type: "info" }
    case 1:
      return { status: "In Progress", type: "primary" }
    case 2:
      return { status: "In Review", type: "warning" }
    case 3:
      return { status: "Completed", type: "success" }
    default:
      break;
  }
}