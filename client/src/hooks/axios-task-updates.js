import axios from 'axios';

export default function axiosTaskUpdates(state, setState, setTeamTasks) {
  function createTaskItem(taskItem) {
      let task = {...taskItem, projecttask_id: state.userInfo.team_id }

      return axios.put(`http://localhost:8080/api/tasks`, task)
      .then(res => {
        const newTasks = [ ...state.teamTasks, res.data ];
        setTeamTasks(newTasks);
      })
      .catch(e => res.send(e));
    }

  function editTaskItem(taskItem) {
    return axios.put(`http://localhost:8080/api/tasks/${taskItem.id}`, taskItem)
    .then(res => {
      const taskItemIndex = state.allTasks.findIndex(x => x.id === taskItem.id);
      setState(prev => ({
        ...prev,
        teamTasks: [
          ...state.teamTasks.slice(0, taskItemIndex),
          Object.assign({}, state.teamTasks[taskItemIndex], taskItem),
          ...state.teamTasks.slice(taskItemIndex + 1)
        ],
        allTasks: [
          ...state.allTasks.slice(0, taskItemIndex),
          Object.assign({}, state.allTasks[taskItemIndex], taskItem),
          ...state.allTasks.slice(taskItemIndex + 1)
        ]
      }))
    })
    .catch(e => res.send(e));
  }

  function deleteTaskItem(id) {
    return axios.delete(`http://localhost:8080/api/tasks/${id}`)
    .then((res) => {
      const tmp = state.allTasks.filter(task => task.id !== id);
      setState(prev => ({...prev, teamTasks: tmp, allTasks: tmp}));
    })
    .catch(e => res.send(e));
  }

  return {
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
  }
}