import axios from "axios";

export const uploadImages = async (formData, path, token) => {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/upload`,
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