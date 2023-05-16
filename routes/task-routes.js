const express = require("express");
const taskControllers = require("../controllers/task-controller");
const router = express.Router();
const { check } = require("express-validator");

router.get("/:taskId", taskControllers.getTaskById);

router.get("/user/:uId", taskControllers.getTasksByUserId);

router.post(
  "/",
  [check("name").not().isEmpty(), check("frequency").not().isEmpty()],
  taskControllers.createTask
);

router.patch(
  "/:taskId",
  [check("name").not().isEmpty(), check("frequency").not().isEmpty()],
  taskControllers.updateTaskById
);

router.delete("/:taskId", taskControllers.deleteTask);

module.exports = router;
