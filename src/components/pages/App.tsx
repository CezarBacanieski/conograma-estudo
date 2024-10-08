import { useState } from 'react';
import Form from '../Form';
import List from '../List';
import Stopwatch from '../Stopwatch';
import style from './App.module.scss';
import { ITask } from '../../types/ITask';

function App() {
  const [tasks, setTasks] = useState<ITask[] | []>([]);
  const [selected, setSelected] = useState<ITask>();

  function selectTask(selectedTask: ITask) {
    setSelected(selectedTask);
    setTasks((prevTasks) =>
      prevTasks.map((task) => ({
        ...task,
        selected: task.id === selectedTask.id ? true : false,
      }))
    );
  }

  function finishTask() {
    if (selected) {
      setSelected(undefined)
      setTasks((prevTasks) =>
        prevTasks.map((task) => {
          if (task.id === selected.id) {
            return { ...task, selected: false, completed: true };
          }
          return task;
        })
      );
    }
  }

  return (
    <div className={style.AppStyle}>
      <Form setTasks={setTasks} />
      <List tasks={tasks} selectTask={selectTask} />
      <Stopwatch selected={selected} finishTask={finishTask} />
    </div>
  );
}

export default App;
