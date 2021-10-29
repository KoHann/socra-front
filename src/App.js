import './App.css';

import { useEffect, useState } from 'react';

const getTasksByKeyword = async (keyword = '') => {
  const endpoint = `http://10.0.1.50:3000/tasks/search/keywords?search=${keyword}`;
  return await fetch(endpoint, { method: "GET" })
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
      return data;
  });
};

const createTask = async (task) => {
  const endpoint = `http://10.0.1.50:3000/task`;
  const body = JSON.stringify(task);
  console.log(body);
  return await fetch(endpoint, { method: "POST", body: body, headers:{'content-type': 'application/json'} })
  .then((response) => response.json())
  .then((data) => {
      console.log(data);
  });
}

const App = () => {
  return <div style={{display: 'flex', justifyContent: 'space-around'}}>
    <TaskDisplay />
    <TaskCreator />
  </div>
};

const TaskDisplay = () => {

  const [tasks, setTasks] = useState([]);

  const handleInputChange = async (event) => {
    const keyword = event.target.value;
    setTasks(await getTasksByKeyword(keyword));
  };

  const refresh = async () => {
    setTasks(await getTasksByKeyword());
  }

  useEffect(() => {
    refresh();
  }, []);

  return <div style={{width: '40%'}}>
    <input onChange={handleInputChange} />
    <button onClick={refresh} >Refresh</button>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      { tasks.map(task => <Task key={task._id} task={task} />) }
    </div>
  </div>
};

const Task = ({task}) => {

  return <div style={{borderBottom: 'solid', display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <span>{task.context}</span>
      <span>{task.duration}</span>
      <span>{task.job}</span>
      <span>{task.location}</span>
      <span>{task.mission}</span>
      <span>{task.price}</span>
      <span>{task.remote}</span>
      <span>{task.start}</span>
    </div>
    <button>Get PDF</button>
  </div>
};

const TaskCreator = () => {

  const submitTask = async (event) => {
    event.preventDefault();
    
    var newTask = {
      'context': event.target.elements.context.value,
      'duration': parseInt(event.target.elements.duration.value),
      'job': event.target.elements.job.value,
      'location': event.target.elements.location.value,
      'mission': event.target.elements.mission.value,
      'price': parseInt(event.target.elements.price.value),
      'remote': parseInt(event.target.elements.remote.value),
      'start': parseInt(event.target.elements.start.value)
    };

    createTask(newTask);
  };

  return <div>
    <form id='form' onSubmit={submitTask} style={{display: 'flex', flexDirection: 'column' }}>
      <label>Context</label>
      <input type='text' id='context' />
      <label>Duration</label>
      <input type='text' id='duration' />
      <label>Job</label>
      <input type='text' id='job' />
      <label>Location</label>
      <input type='text' id='location' />
      <label>Mission</label>
      <input type='text' id='mission' />
      <label>Price</label>
      <input type='text' id='price' />
      <label>Remote</label>
      <input type='text' id='remote' />
      <label>Start</label>
      <input type='text' id='start' />
      <input type='submit' value='Create' />
    </form>
  </div>
}


export default App;
