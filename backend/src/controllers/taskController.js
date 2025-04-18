const Task = require('../models/Task');
const UserService = require('../services/userService');

exports.createTask = async (req, res) => {
    try {
        const { task, desc, status, date } = req.body;
        const { email, id } = req.query; 
        const user = await UserService.verifyIfExists(email, id);

        if (!user) {
            return res.status(400).json({ message: "ID do usuário é obrigatório!" });
        }

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado!" });
        }

        const newTask = await Task.create({ task, description: desc, status, date, user: user });
        return res.status(201).json(newTask);
    } catch (error) {
        console.error("Erro ao criar a tarefa:", error);
        return res.status(500).json({ message: "Erro interno do servidor" });
    }
};

exports.updateTask = async (req, res) => {
    const { taskId, email, id } = req.query;
    const { task, description, status, date } = req.body;
    const user = await UserService.verifyIfExists(email, id);

    const taskToUpdate = {
        _id: taskId,
    }

    try {
        const updatedTask = await Task.findOneAndUpdate(
            taskToUpdate,
            { task, description, status, date, user: user },
            { new: true } 
        );
        console.log(task, description, status, date)

        if (!updatedTask) return res.status(404).json({ message: "Tarefa não encontrada." });

        res.json({ message: "Tarefa atualizada com sucesso!", task: updatedTask });
    } catch (error) {
        res.status(500).json({ message: "Erro ao atualizar tarefa." });
    }
}; 

exports.deleteTask = async (req, res) => {
    const { taskId } = req.query;

    const taskToDelete = {
        _id: taskId,
    }

    try {
        const deletedTask = await Task.findByIdAndDelete(taskToDelete);

        if (!deletedTask) return res.status(404).json({ message: "Tarefa não encontrada." });

        res.json({ message: "Tarefa excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: "Erro ao excluir tarefa." });
    }
};

exports.getAllTasks = async (req, res) => {
    const { email, id } = req.query
    const user = await UserService.verifyIfExists(email, id);
    try {
        const tasks = await Task.find({user: user});

        return res.json({ tasks });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar tarefas." });
    }
};
