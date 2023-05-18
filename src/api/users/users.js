import axios from "axios";

export const getUsers = async (token, searchKey) => {
  const { data } = await axios.get(
    `${process.env.REACT_API_BACKEND_URL}/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(data);
  //   return data.artists.items;
};

export const login = async (data) => {
  console.log("cs", process.env.REACT_API_BACKEND_URL);

  try {
    console.log(data);
    console.log("cs", process.env.REACT_API_BACKEND_URL);

    const response = await axios.post(
      `https://task-checklist-backend.herokuapp.com/api/users/login`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error; // Re-throw the error to be handled by the caller
  }
};

export const signup = async (data) => {
  console.log("cs", process.env.REACT_API_BACKEND_URL);

  try {
    console.log(data);
    console.log("cs", process.env.REACT_API_BACKEND_URL);
    const response = await axios.post(
      `https://task-checklist-backend.herokuapp.com/api/users/signup`,
      data
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    return error; // Re-throw the error to be handled by the caller
  }
};
