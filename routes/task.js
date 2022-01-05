

const express = require('express')
const { get } = require('mongoose')

const router = express.Router()

const {
    getAllTasks,
    getTask,
    createTask,  
    updateTask,
    deleteTask
} = require('../controller/task')


router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask)


module.exports = router
