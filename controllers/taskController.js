import Task from "../models/Task.js";


export const createTask = async (req, res, next) => {

    try {
        const task = await Task.create({ ...req.body, createdBy: req.user._id })
        res.status(201).json(task)
    } catch (error) {
        next(error)
    }
}

export const getMyTasks = async (req, res, next) => {
    try {
        const tasks = await Task.find({ createdBy: req.user._id })
        res.json(tasks)
    } catch (error) {
        next(error)
    }
}

export const updateTask = async (req, res, next) => {

    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, createdBy: req.user._id },
            req.body,
            { new: true }
        );

        if (!task) return res.status(404).json("Task not found")
        res.json(task)
    } catch (error) {
        next(error)
    }
}

export const deleteTask = async (req, res, next) => {

    try {
        const task = await Task.findOneAndDelete(
            { _id: req.params.id, createdBy: req.user._id }
        );
        if (!task) return res.status(404).json("Task not found")

        res.json({ message: "Task deleted" })

    } catch (error) {
        next(error)
    }
}