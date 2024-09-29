import React, { useEffect, useState } from 'react';
import { db } from '../firebaseConfig'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import Task from './Task';
import '../App.css'; 

const TaskList = ({ user }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'tasks'), where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskArray = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTasks(taskArray);
    });

    return () => unsubscribe();
  }, [user]); 

  return (
    <div className="task-list">
      {tasks.length > 0 ? (
        tasks.map(task => (
          <Task key={task.id} taskData={task} />
        ))
      ) : (
        <p>No tasks available. Add some!</p>
      )}
    </div>
  );
};

export default TaskList;
