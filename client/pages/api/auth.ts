import axios from "axios";
import { API_URL } from "./url";
import "react-toastify/dist/ReactToastify.css";

export const updateUser = async ({ username, fullname, id, bio }: any) => {
   try {
      const response = await axios.patch(`${API_URL}/@me`, {
         id,
         username,
         fullname,
         bio,
      });
      if (response.status === 200) {
         localStorage.setItem("user", JSON.stringify(response.data));
         window.location.href = "/dashboard";
      }

      return response;
   } catch (error) {
      console.log(error);
   }
};

export const registerUser = async ({
   username,
   email,
   password,
   fullname,
   image,
   bio,
}: any) => {
   try {
      const response = await axios.post(
         `${API_URL}/register`,
         {
            username,
            email,
            password,
            fullname,
            image,
            bio,
         },
         { withCredentials: true }
      );

      if (response.status === 200) {
         localStorage.setItem("user", JSON.stringify(response.data));
         window.location.href = "/dashboard";
      }

      return response.data;
   } catch (error: any) {
      console.log(error);
   }
};

export const loginUser = async ({ username, password }: any) => {
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

      return response.data;
   } catch (e: any) {
      alert("Incorrect");
   }
};

export const logout = async () => {
   try {
      const resp = await axios.get(`${API_URL}/logout`, {
         withCredentials: true,
      });
      window.location.href = "/";

      return resp;
   } catch (error) {
      console.log(error);
   }
};
