import { useCallback, useEffect, useState } from "react";
import { api } from "../../../../constants";
import { useAuth0 } from "@auth0/auth0-react";
import "./style.css"; 

export default function AllTasks() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [taskUpdated, setTaskUpdated] = useState({})
  const [newDate, setNewDate] = useState("");
  const [deletingId, setDeletingId] = useState(null);

const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const getAllTasks = useCallback(async () => {
    try {
      const token = await getAccessTokenSilently();
      const response = await api.get(
  "/tasks/all",
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

  const taskToEdit = (id) => {
    const taskToEditate = tasks.find(task => task._id === id)
    setTaskUpdated(taskToEditate)
    setNewDate(convertDate(taskToEditate.date));
    setEditingTask(id);
  };

   const handleChange = (e) => {
     const { name, value } = e.target;

     if (name === "date") {
       setNewDate(value)
       return; 
     }

     setTaskUpdated((prev) => ({
       ...prev,
       [name]: value,
     }));
   };
   const handleSave = async (e) => {
    const form = e.target.closest("form");

    if (!form.checkValidity()) {
      form.reportValidity(); 
      return;
    }
    const token = await getAccessTokenSilently();
    const taskToReq = {
      ...taskUpdated,
      date: newDate,
    };
    const response = await api.put(
      `/tasks/update/${editingTask}`,
      taskToReq,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          taskId: editingTask,
          id: user.sub,
          email: user.email,
        },
      }
    );
    setEditingTask(null);
    getAllTasks();
    return response
   };

   const handleCancel = async () => {
    setNewDate("")
    setEditingTask(null);
    setTaskUpdated({})
    getAllTasks();
   };

   const handleDelete = async (id) => {
     if (deletingId) return; // evita múltiplos cliques

     setDeletingId(id);

     try {
       const token = await getAccessTokenSilently();
       await api.delete(
         `/tasks/delete/${id}`,
         {
           headers: {
             Authorization: `Bearer ${token}`,
           },
           params: {
             taskId: id,
           },
         }
       );

       await getAllTasks();
     } catch (error) {
       console.error("Erro ao deletar:", error);
     } finally {
       setDeletingId(null);
     }
   };

  useEffect(() => {
    if (isAuthenticated) {
      getAllTasks();
    }
  }, [isAuthenticated, getAllTasks]);

   return (
     <section className="task-container">
       <h2 className="task-title">Suas Tarefas</h2>

       {tasks.length > 0 ? (
         <div className="task-list">
           {tasks.map((task) => (
             <form
               key={task._id}
               className="task-card"
               onSubmit={(e) => e.preventDefault()}
             >
               <div className="input-card">
                 <label htmlFor="Título">Título</label>
                 <input
                   type="text"
                   className="task-name"
                   name="task"
                   value={
                     editingTask === task._id ? taskUpdated.task : task.task
                   }
                   disabled={editingTask !== task._id}
                   onChange={handleChange}
                 />
               </div>

               <div className="input-card">
                 <label htmlFor="Título">Descrição</label>
                 <textarea
                   className="task-desc"
                   name="description"
                   value={
                     editingTask === task._id
                       ? taskUpdated.description
                       : task.description
                   }
                   disabled={editingTask !== task._id}
                   onChange={handleChange}
                 />
               </div>

               <div className="input-card">
                 {editingTask === task._id ? (
                   <select
                     className="task-status select"
                     name="status"
                     value={taskUpdated.status}
                     onChange={handleChange}
                   >
                     <option value="Pendente">Pendente</option>
                     <option value="Em andamento">Em Andamento</option>
                     <option value="Concluída">Concluído</option>
                   </select>
                 ) : (
                   <span className={`task-status ${task.status.toLowerCase()}`}>
                     {task.status}
                   </span>
                 )}
               </div>

               <div className="input-card">
                 <label htmlFor="Título">Data de Conclusão</label>
                 <input
                   type="date"
                   name="date"
                   min={new Date().toISOString().split("T")[0]}
                   max="2099-12-31"
                   value={
                     editingTask === task._id
                       ? newDate || ""
                       : convertDate(task.date) || ""
                   }
                   onChange={handleChange}
                   disabled={editingTask !== task._id}
                 />
               </div>

               <div className="btn-task">
                 <div className="edit-task-mode">
                   {editingTask === task._id ? (
                     <div className="btn-mode">
                       <button
                         type="button"
                         className="btn-save"
                         onClick={handleSave}
                       >
                         Salvar Alterações
                       </button>
                       <button
                         type="button"
                         className="btn-cancel"
                         onClick={handleCancel}
                       >
                         Cancelar
                       </button>
                     </div>
                   ) : (
                     <div className="btn-mode">
                       <button
                         type="button"
                         className="btn-edit"
                         onClick={() => taskToEdit(task._id)}
                       >
                         Editar
                       </button>
                       <button
                         type="button"
                         className="btn-delete"
                         onClick={() => handleDelete(task._id)}
                       >
                         Deletar
                       </button>
                     </div>
                   )}
                 </div>
               </div>
             </form>
           ))}
         </div>
       ) : (
         <p className="no-tasks">Nenhuma tarefa cadastrada.</p>
       )}
     </section>
   );
}
