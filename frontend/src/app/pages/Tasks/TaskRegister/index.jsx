import React, { useEffect, useState } from "react";
import { STATE_TASK } from "../categories";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { api } from "../../../../constants";
import { useNavigate } from "react-router-dom";

const notify = () => toast("Tarefa Registrada");

function TaskRegister() {
  const [task, setTask] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("Pendente")
  const [date, setDate] = useState("");
  const [click, setClick] = useState("auto")

  const navigate = useNavigate();

  const { user, getAccessTokenSilently } = useAuth0();

  const registerTask = async (e) => {
    e.preventDefault();
    try {
      const token = await  getAccessTokenSilently();
      const response = await api.post(
        `/tasks/create`,
        {
          task,
          desc,
          status,
          date,
        },
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
      if (response.status === 201) {
        setClick("none")
        notify()
        setTimeout(() => navigate("/"), 3000
      );
      }
    } catch (error) {
      console.error(error)
    }
  };

  const convertDate = (date = "") => {
    const parsed = new Date(date);
    if (isNaN(parsed)) return "";

    return (
      parsed.getUTCFullYear() +
      "-" +
      (parsed.getUTCMonth() + 1).toString().padStart(2, "0") +
      "-" +
      parsed.getUTCDate().toString().padStart(2, "0")
    );
  };
  const handleReset = () => {
  setTask("")
  setDesc("")
  setStatus("Pendente");
  setDate(convertDate(new Date()))
  }

  useEffect(() => {
    setDate(convertDate(new Date()))
  },[])

  return (
    <form className="task-register" onSubmit={registerTask} onReset={handleReset} style={{ pointerEvents: click }}>
      
      <h2 className="task-register-title">Criar Nova Tarefa</h2>

      <div className="input-form">
        <label htmlFor="task">Tarefa</label>
        <input
          type="text"
          placeholder="Digite o nome da tarefa"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
      </div>

      <div className="input-form">
        <label htmlFor="description">Descrição</label>
        <textarea
          placeholder="Adicione uma descrição detalhada..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          required
        ></textarea>
      </div>

      <div className="input-form">
        <label htmlFor="status">Status</label>
        <select name="status" onChange={(e) => setStatus(e.target.value)}>
          {STATE_TASK.map((state, index) => (
            <option value={state} key={index}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="input-form">
        <label htmlFor="date">Prazo de Entrega</label>
        <input
          type="date"
          required
          value={date}
          min={new Date().toISOString().split("T")[0]}
          max="2099-12-31"
          onChange={(e) => setDate(e.target.value)}
      />
      </div>

      <div className="btn-form">
        <button type="reset" className="btn-reset">
          Resetar
        </button>
        <button type="submit" className="btn-submit">
          Registrar
        </button>
      </div>
    </form>
  );
}

export default TaskRegister;
