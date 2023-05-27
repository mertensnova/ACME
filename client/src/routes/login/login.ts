// Import the $ function
import { $ } from "@builder.io/qwik";
import axios from "axios";
import { API_URL } from "~/url";

// Define a function that takes some props
async function loginUser({ username, password }: any) {
   try {
      const response = await axios.post(
         `${API_URL}/login`,
         {
            username,
            password,
         },
         { withCredentials: true }
      );

      if (response.status === 200) {
         localStorage.setItem("user", JSON.stringify(response.data));
         window.location.href = "/dashboard";
      }

      console.log("====================================");
      console.log(username, password);
      console.log("====================================");

      return response.data;
   } catch (error: any) {
      console.log(error);
   }
   // Your logic here
}

// Create a QRL for the function
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const loginUserQRL = $(loginUser);
