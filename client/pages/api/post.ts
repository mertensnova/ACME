import axios from "axios";
import { API_URL } from "./url";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const addPost = async ({ content, userid }: any) => {
  const notify = () =>
    toast.success("Post added", {
      theme: "dark",
    });
  try {
    const response = await axios.post(
      `${API_URL}/add-post`,
      {
        userid,
        content,
      },
      { withCredentials: true }
    );
    notify();

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
