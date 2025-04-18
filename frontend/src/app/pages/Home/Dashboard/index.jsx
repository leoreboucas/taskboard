import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";
import { useAuth0 } from "@auth0/auth0-react";
import { api } from "../../../../constants";



function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [pendantTasks, setPendantTasks] = useState([]);
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();


  const getAllTasks = useCallback(async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await api.get(
          `/tasks/all`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              id: user.sub,
              email: user.email,
            },
          }
        );
        setTasks(response.data.tasks);
      } catch (error) {
        console.error("Falha na pesquisa:", error);
      }
    }, [getAccessTokenSilently, user]);

    useEffect(() => {
        if (isAuthenticated) {
          getAllTasks();
        }
      }, [isAuthenticated, getAllTasks]);

      
      useEffect(() => {
        setPendantTasks(
          tasks.filter((task) => task.status === "Pendente")
        );
        setInProgressTasks(tasks.filter(task => task.status === 'Em andamento'))
        setCompletedTasks(
          tasks.filter((task) => task.status === "Concluída")
        );
    }, [tasks]);



  return (
    <div className="dashboard">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">
        Gerencie suas tarefas de forma eficiente e acompanhe seu progresso.
      </p>
      <nav className="nav-tasks-links">
        <Link className="nav-link" to="/tasks">
          Ver todas as tarefas
        </Link>
        <Link className="nav-link primary" to="/tasks/register">
          Criar nova tarefa
        </Link>
      </nav>

      <section className="resume-tasks">
        <section className="state-tasks">
          <h2>Status das Tarefas</h2>
          <ul className="state-tasks-list">
            <li className="state-tasks-item pending">
              <div>
                <strong>Pendentes:</strong>{" "}
                <span className="task-count">{pendantTasks.length}</span>
              </div>
            </li>
            <li className="state-tasks-item in-progress">
              <div>
                <strong>Em andamento:</strong>{" "}
                <span className="task-count">
                  {inProgressTasks.length}
                </span>
              </div>
            </li>
            <li className="state-tasks-item completed">
              <div>
                <strong>Concluídas:</strong>{" "}
                <span className="task-count">{completedTasks.length}</span>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </div>
  );
}

export default Dashboard;
