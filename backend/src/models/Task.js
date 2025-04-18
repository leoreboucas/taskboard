const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    task: { type: String, required: true },
    description: { type: String },
    date: {
        type: Date,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pendente', 'Em andamento', 'Concluída'],
        default: 'Pendente'
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    timestamps: true, 
});

module.exports = mongoose.model("Task", TaskSchema);