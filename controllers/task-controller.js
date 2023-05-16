const HttpError = require("../models/http-error");
const Task = require("../models/task");
const { validationResult } = require("express-validator");
const User = require("../models/user");
const mongoose = require("mongoose");

const getTaskById = async (req, res, next) => {
  const taskId = req.params.taskId;

  let task;

  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError("Something went wrong", 404);
    return next(error);
  }

  if (!task) {
    const error = new HttpError(
      "Could not find a task for the provided id",
      404
    );
    return next(error);
  }
  res.json({ task: task.toObject({ getters: true }) });
};

const getTasksByUserId = async (req, res, next) => {
  const userId = req.params.uId;
  let userWithTasks;
  console.log(userId);
  try {
    userWithTasks = await User.findById(userId).populate("tasks");
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      "Fetching tasks failed, please try again later.",
      500
    );
    return next(error);
  }

  if (!userWithTasks || userWithTasks.tasks.length === 0) {
    return next(
      new HttpError("Could not find tasks for the provided user id.", 404)
    );
  }

  res.json({
    tasks: userWithTasks.tasks.map((task) => task.toObject({ getters: true })),
  });
};

const createTask = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { name, frequency, owner } = req.body;
  const createdTask = new Task({
    name,
    frequency,
    owner,
  });
  console.log(req.body);
  let user;

  try {
    user = await User.findById(owner);
  } catch (err) {
    const error = new HttpError("Creating Task Failed", 500);
    return next(error);
  }

  if (!user) {
    const error = new HttpError(
      "Could not find user for provided task id",
      500
    );
    return next(error);
  }

  console.log(user);

  // Update user/task relation: Ensures entire session only goes through if all is successful

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await createdTask.save({ session: session });
    user.tasks.push(createdTask);
    await user.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError("Creating Task Failed", 500);
    return next(error);
  }
  res.status(201).json({ message: user });
};

const updateTaskById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }
  const { frequency, name } = req.body;
  const taskId = req.params.taskId;

  let task;
  try {
    task = await Task.findById(taskId);
  } catch (err) {
    const error = new HttpError("Something went wrong. Could not update", 500);
    return next(error);
  }
  updatedTask.frequency = frequency;
  updatedTask.name = name;

  try {
    await task.save();
  } catch (err) {
    const error = new HttpError("Something went wrong. Could not update", 500);
    return next(error);
  }

  res.status(201).json({ task: task.toObject({ getters: true }) });
};

const deleteTask = async (req, res, next) => {
  const taskId = req.params.taskId;
  let task;
  // Allows us to refer to a document stored in another collection - need ref connection in Schema
  try {
    task = await Task.findById(taskId).populate("owner");
  } catch (err) {
    const error = new HttpError("Something went wrong. Could not Delete", 500);
    return next(error);
  }

  if (!task) {
    const error = new HttpError("Task not found", 404);
    return next(error);
  }
  console.log(task.owner.tasks);
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await task.deleteOne({ session: session });
    task.owner.tasks.pull(task);
    await task.owner.save({ session: session });
    await session.commitTransaction();
  } catch (err) {
    const error = new HttpError(
      "Something went wrong. Could not delete. Try again",
      500
    );
    return next(error);
  }

  res.status(200).json({ message: "Task deleted" });
};

exports.createTask = createTask;
exports.getTaskById = getTaskById;
exports.getTasksByUserId = getTasksByUserId;
exports.updateTaskById = updateTaskById;
exports.deleteTask = deleteTask;
