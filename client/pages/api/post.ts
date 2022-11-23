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
    const userid = user.ID;

    const response = await axios.post(
      `${API_URL}/add-post`,
      {
        userid,
        content,
      },
      { withCredentials: true }
    );
    console.log(response.data);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};

// export const getAllPosts = async () => {
//   try {
//     // You can use any data fetching library
//     const res = await axios.get(`${API_URL}/dashboard`, {
//       withCredentials: true,
//     });
//     // console.log(res);

//     return res.data;
//   } catch (error) {
//     console.log(error);
//   }
//   // By returning {
// };
