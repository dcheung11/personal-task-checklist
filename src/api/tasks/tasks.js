import axios from "axios";

export const getTasksbyUserId = async (user) => {
  try {
    const { data } = await axios.get(
      `https://task-checklist-backend.herokuapp.com/api/tasks/user/${user}`,
      {}
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return error; // Re-throw the error to be handled by the caller
  }

  //   return data.artists.items;
};

export const createTask = async (task, freq, id) => {
  try {
    const { data } = await axios.post(`https://task-checklist-backend.herokuapp.com/api/tasks/`, {
      name: task,
      frequency: freq,
      owner: id,
    });
    return data;
  } catch (error) {
    console.error(error);
    return error; // Re-throw the error to be handled by the caller
  }
};

export const deleteTaskById = async (taskId) => {
  try {
    const { data } = await axios.delete(
      `https://task-checklist-backend.herokuapp.com/api/tasks/${taskId}`,
      {}
    );
    return data;
  } catch (error) {
    console.error(error);
    return error; // Re-throw the error to be handled by the caller
  }
};
