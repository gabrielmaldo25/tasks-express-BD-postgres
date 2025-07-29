const taskModel = require("../models/taskModel");
const { validationResult } = require("express-validator");

//Obtener todas las tareas
const getTasks = async (req, res, next) => {
  try {
    const tasks = await taskModel.getTasks();
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

//Obtener tarea por id
const getTaskById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const taskId = parseInt(req.params.id);
    const task = await taskModel.getTaskById(taskId);
    if (!task) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    } else {
      res.json(task);
    }
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const newTask = await taskModel.createTask(req.body);
    res.status(201).json(newTask);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const taskId = parseInt(req.params.id);
    const updatedTask = await taskModel.updateTask(taskId, req.body);
    if (!updatedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    } else {
      res.json(updatedTask);
    }
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const deletedTask = await taskModel.deleteTask(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Tarea no encontrada" });
    } else {
      res.json({ message: "Tarea eliminada", tarea_eliminada: deletedTask });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
