import React from 'react';
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import '../App.css';

const Task = ({ taskData }) => {
  const toggleComplete = async () => {
    const taskRef = doc(db, 'tasks', taskData.id);
    await updateDoc(taskRef, {
      completed: !taskData.completed
    });
  };

  const deleteTask = async () => {
    const taskRef = doc(db, 'tasks', taskData.id);
    await deleteDoc(taskRef);
  };

  return (
    <div className={`task ${taskData.completed ? 'completed' : ''}`}>
      <span className="task-text" onClick={toggleComplete}>{taskData.task}</span>
      <button className="delete-task-btn" onClick={deleteTask}>Delete</button>
    </div>
  );
};

export default Task;
