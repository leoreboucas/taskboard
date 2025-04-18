// Configuração do banco de dados

const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const cors = require('cors');

const mongoose = require('mongoose');
const userRoutes = require("./routes/userRoutes");
const taskRoutes = require('./routes/taskRoutes');



const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", userRoutes);
app.use("/api/tasks", taskRoutes);
app._router.stack.forEach((r) => {
    if (r.route && r.route.path) {
        console.log(r.route.path);
    }
});


const PORT = process.env.PORT || 4000

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Conectado ao MongoDB"))
.catch((err) => console.error('Erro ao conectar ao MongodDB', err))



app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));