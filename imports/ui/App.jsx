import React, { useState} from 'react';
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from '../api/TasksCollection';
import { Task } from './Task';
import { TaskForm } from './TaskForm'

const toggleChecked = ({ _id, isChecked}) => {
  TasksCollection.update(_id, {
    $set: {
      isChecked: !isChecked
    }
  })
}

const deleteTask = ({ _id}) => {
  TasksCollection.remove(_id)
}

export const App = () => {
  const [hideCompleted, setHideCompleted] = useState(false);
  // const tasks = useTracker(() => TasksCollection.find({}, { sort: { createdAt: -1 }}).fetch())

  const hideCompletedFilter = { isChecked: { $ne: true } };
  const tasks = useTracker(() =>
    TasksCollection.find(hideCompleted ? hideCompletedFilter : {}, {
    sort: { createdAt: -1 },
    }).fetch()
  );

  const pendingTaskCount =  useTracker(() => 
    TasksCollection.find(hideCompletedFilter).count()
  );

  // const pendingTasksTitle = `${pendingTaskCount ? ` (${pendingTaskCount})` : '' }`
  
  return (
      <div>
        <h1>Welcome to Meteor!</h1>
        
        <TaskForm />
        <div className="filter">
         <button onClick={() => setHideCompleted(!hideCompleted)}>
           {hideCompleted ? 'Show All' : 'Hide Completed'}
         </button>
        </div>

        <h1>
        📝️ To Do List
        {' '}{pendingTaskCount}
        </h1>

        <ul>
          { tasks.map(task => <Task key={task._id} task={task} onCheckboxClick={toggleChecked} onDeleteClick={deleteTask} />) }
        </ul>
      </div>
  );
};
