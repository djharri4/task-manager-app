import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from './firebaseConfig'; 
import { getDocs, query, collection, where } from 'firebase/firestore'; 
import Navbar from './components/Navbar';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';
import Footer from './components/Footer';
import Header from './components/Header';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchTasks(); 
      }
    });
    return () => unsubscribe();
  }, [user]); 

  const fetchTasks = async () => {
    if (!user) {
      console.error("User is not authenticated.");
      return;
    }

    try {
      const q = query(collection(db, 'tasks'), where('userId', '==', user.uid)); 
      const querySnapshot = await getDocs(q); 
      const tasksArray = [];
      querySnapshot.forEach((doc) => {
        tasksArray.push({ id: doc.id, ...doc.data() });
      });
      setTasks(tasksArray);
    } catch (error) {
      console.error("Error fetching tasks: ", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error("Login Error: ", error);
      if (error.code === 'auth/user-not-found') {
        setErrorMessage("No account found with that email.");
      } else if (error.code === 'auth/wrong-password') {
        setErrorMessage("Incorrect password. Please try again.");
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setEmail('');
      setPassword('');
      setErrorMessage('');
    } catch (error) {
      console.error("Sign Up Error: ", error);
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage("This email is already in use.");
      } else {
        setErrorMessage("Sign up failed. Please try again.");
      }
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <Navbar user={user} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={
            user ? (
              <>
                <AddTask user={user} fetchTasks={fetchTasks} />
                <TaskList user={user} tasks={tasks} />
              </>
            ) : (
              <div className="auth-container">
                <h2 className="form-title">{isLoginMode ? 'Login' : 'Sign Up'}</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={isLoginMode ? handleLogin : handleSignup} className="auth-form">
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="auth-input"
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    required
                  />
                  <button type="submit" className="auth-btn">{isLoginMode ? 'Login' : 'Sign Up'}</button>
                  <button type="button" onClick={() => setIsLoginMode(!isLoginMode)} className="toggle-btn">
                    Switch to {isLoginMode ? 'Sign Up' : 'Login'}
                  </button>
                </form>
              </div>
            )
          } />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
