import axios from "axios";

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `http://localhost:3500/api/upload`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};