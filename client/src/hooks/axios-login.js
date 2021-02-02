import axios from 'axios';


export default function axiosLogin(loginToken, setState) {
  const GET_INIT_DATA = `http://localhost:8080/${loginToken}`;
  const GET_USER_INFO = `http://localhost:8080/api/employees/${loginToken}`;
  const GET_USER_TASKS = `http://localhost:8080/api/tasks/user/${loginToken}`;
  const GET_TEAM_TASKS = `http://localhost:8080/api/tasks/team/1`;
  const GET_TEAM_USERS = `http://localhost:8080/api/employees/team/1`;
  const GET_USER_DEADLINES = `http://localhost:8080/api/tasks/deadlines/${loginToken}`;

  axios.get(GET_INIT_DATA)
    .then(res => {
      const { userTasks, userInfo, teamTasks, teamUsers, deadlines } = res.data;

      setState(prev => ({ 
        ...prev, 
        userTasks, 
        userInfo, 
        teamTasks, 
        deadlines, 
        teamUsers, 
        allTasks: teamTasks, 
        role: userInfo.role, 
        team: userInfo.team_id, 
      }));
    })
    .catch(e => res.send(e));
}

  // useEffect(() => {
  //   axios.get(`${MESSAGES_URL}/15`)
  //   .then(res => setMessages(res.data));
  // }, []);
