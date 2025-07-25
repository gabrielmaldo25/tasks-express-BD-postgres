const pg = require("../config/db");

//función para obtener tareas
const getTasks = async () => {
  try {
    const res = await pg.query(`SELECT * FROM tasks`);
    return res.rows;
  } catch (error) {
    throw error;
  }
};

//obtener por id
const getTaskById = async (id) => {
  try {
    const res = await pg.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

//crear nueva tarea
const createTask = async (task) => {
  const { title, description } = task;

  try {
    const res = await pg.query(
      `INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *`,
      [title, description]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

const updateTask = async (id, task) => {
  const { title, description } = task;
  try {
    const res = await pg.query(
      `UPDATE tasks SET title=$1, description=$2 WHERE id=$3 RETURNING *`,
      [title, description, id]
    );
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    const res = await pg.query(`DELETE FROM tasks WHERE id = $1 RETURNING *`, [
      id,
    ]);
    return res.rows[0];
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
