
import React, { useState } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import '../App.css';

const AddTask = ({ user, fetchTasks }) => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task) {
      await addDoc(collection(db, 'tasks'), {
        userId: user.uid,
        task,
        completed: false,
        createdAt: new Date(),
      });
      setTask('');
      fetchTasks();
    }
  };

  return (
    <form className="add-task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a new task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        className="task-input"
        required
      />
      <button type="submit" className="add-task-btn">Add Task</button>
    </form>
  );
};

export default AddTask;
