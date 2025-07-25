const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");

const { body, param, validationResult } = require("express-validator");

const validateTaskBody = [
  body("title")
    .isLength({ min: 1 })
    .withMessage("Title es requerido")
    .isString()
    .withMessage("Title es un string")
    .trim()
    .escape(),
  body("description")
    .optional()
    .isString()
    .withMessage("Description es un string")
    .trim()
    .escape(),
];

const validateParamTaskId = [
  param("id")
    .isInt({ gt: 0 })
    .withMessage("El id de la tarea tiene que ser mayor que 0 y positivo")
    .toInt(),
];

router.get("/", taskController.getTasks);
router.get("/:id", validateParamTaskId, taskController.getTaskById);
router.post("/", validateTaskBody, taskController.createTask);
router.put(
  "/:id",
  validateParamTaskId.concat(validateTaskBody),
  taskController.updateTask
);
router.delete("/:id", validateParamTaskId, taskController.deleteTask);

module.exports = router;
