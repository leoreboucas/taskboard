const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const checkJwt = require('../middlewares/authMiddleware');  

router.post('/create', checkJwt, taskController.createTask);
router.put('/update/:taskId', checkJwt, taskController.updateTask);
router.delete('/delete/:taskId', checkJwt, taskController.deleteTask);
router.get('/all', checkJwt, taskController.getAllTasks);
module.exports = router;