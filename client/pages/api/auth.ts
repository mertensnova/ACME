import axios from "axios";
import { API_URL } from "./url";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const registerUser = async ({
  username,
  email,
  password,
  fullname,
  profile,
}: any) => {
  try {
    const notify = () =>
      toast.success("Registered successfully", {
        theme: "dark",
      });
    const response = await axios.post(
      `${API_URL}/register`,
      {
        username,
        email,
        password,
        fullname,
        profile,
      },
      { withCredentials: true }
    );
    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(response.data));
      window.location.href = "/dashboard";
      notify();
    }
    return response.data;
  } catch (error: any) {
    console.log(error);
  }
};

export const loginUser = async ({ username, password }: any) => {
  const notify = () =>
    toast.success("Login successfull", {
      theme: "dark",
    });
  const failure = () =>
    toast.error("Invalid Credntials", {
      theme: "dark",
    });
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
      notify();
    }
    return response.data;
  } catch (error: any) {
    if (error.message == "Request failed with status code 403") {
      failure();
    }
    console.log(error.message);
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
