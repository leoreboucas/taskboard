import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home'
import Profile from './pages/Profile';
import { Routes, Route } from 'react-router-dom'; 
import TaskRegister from './pages/Tasks/TaskRegister';
import { useAuth0 } from '@auth0/auth0-react';
import { URL_BACKEND } from '../constants';
import { Bounce, ToastContainer } from 'react-toastify';
import AllTasks from './pages/Tasks/AllTasks';
import TaskStatus from './pages/Tasks/TaskStatus';
import { api } from '../constants';
function App() {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userExists, setUserExists] = useState(null);

  const verifyIfUserExists = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await api.get(`/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          email: user.email,
          id: user.sub
        }
      });
      return response.data ? setUserExists(true) : setUserExists(false);
    } catch (error) {
      console.error("Erro ao obter token ou dados:", error);
      return false;
    }
  }, [getAccessTokenSilently, user]);

  const registerUser = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      
      const response = await api.post(
        `${URL_BACKEND}/register`,
        {
          username: user.nickname,
          name: user.name,
          auth0_id: user.sub,
          imageProfile: user.picture,
          ...(user.email && { email: user.email })
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data

    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  }, [getAccessTokenSilently, user]);

  useEffect(() => {
    if (isAuthenticated) {
      verifyIfUserExists();
    }
  }, [isAuthenticated, verifyIfUserExists]);

  useEffect(() => {
    if (userExists === false) {
      registerUser();
    }
  }, [userExists, registerUser]);
  return (
    <div className="App">
      <Header />
      <main className='main-content'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasks" element={<AllTasks />} />
          <Route path="/tasks/:status" element={<TaskStatus />} />
          <Route path="/tasks/register" element={<TaskRegister />} />
        </Routes>
      </main>
      <ToastContainer position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce} />
      <Footer />
    </div>
  );
}

export default App;