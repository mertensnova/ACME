import axios from "axios";
import { API_URL } from "./url";

export const addPost = async ({ content }: any) => {
  try {
    let user;
    if (typeof window !== "undefined") {
      user = JSON.parse(localStorage.getItem("user") ?? "");
    } else {
      console.log("You are on the server");
    }
    const id = user.ID;

    const response = await axios.post(
      `${API_URL}/add-post`,
      {
        content,
        id,
      },
      { withCredentials: true }
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
