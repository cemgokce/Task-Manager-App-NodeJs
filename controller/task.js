const Task = require('../models/Task')
const asyncWrapper = require('../middleware/async')
const {createCustomError} = require('../errors/custom-error')

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
})

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body)
    res.status(201).json({ task })
})

const getTask = asyncWrapper(async (req, res, next) => {

    const { id: taskID } = req.params;
    const tasks = await Task.findOne({ _id: taskID })
    if (!tasks) {
        // const error = new Error('Not Found!')
        // error.status = 404
        // return next(error)
        return next(createCustomError(`No taks with this id : ${id}`,404 ))

        // return res.status(404).json({ msg: `No task with id ${id}` })
    }
    res.status(200).json({ tasks })

})

const deleteTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID })
    if (!task) {
        return next(createCustomError(`No taks with this id : ${id}`,404 ))
        // return res.status(404).json({ msg: `Cant find task by this id ${id}` })
    }
    res.status(200).json({ task })

})

const updateTask = asyncWrapper(async (req, res) => {

    const { id: taskID } = req.params;
    task = await Task.findByIdAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true
    });

    if (!task) {
        return next(createCustomError(`No taks with this id : ${id}`,404 ))
        // return res.status(404).json({ msg: `Cant find task by this id ${id}` })
    }
    res.status(200).json({ task })
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
}