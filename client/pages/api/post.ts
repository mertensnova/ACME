import axios from "axios";
import { API_URL } from "./url";

export const addPost = async ({ content, id }: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-post`,
      {
        id,
        content,
      },
      { withCredentials: true }
    );
    console.log(response.data);

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const res = await axios.get(`${API_URL}/dashboard`, {
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};
