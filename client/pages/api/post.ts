import axios from "axios";
import { API_URL } from "./url";

export const addPost = async ({ content }: any) => {
  try {
    const response = await axios.post(
      `${API_URL}/add-post`,
      {
        content,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
