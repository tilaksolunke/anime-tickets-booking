import { axiosInstance } from ".";

// Add new theater
export const AddTheater = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/add-theater",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// get all theaters
export const GetAllTheaters = async () => {
  try {
    const response = await axiosInstance.get("/api/theaters/get-all-theaters");
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// get all theaters by owner
export const GetAllTheatersByOwner = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/get-all-theaters-by-owner",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// update theater
export const UpdateTheater = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/update-theater",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};

// delete theater
export const DeleteTheater = async (payload) => {
  try {
    const response = await axiosInstance.post(
      "/api/theaters/delete-theater",
      payload
    );
    return response.data;
  } catch (error) {
    return error.response;
  }
};
