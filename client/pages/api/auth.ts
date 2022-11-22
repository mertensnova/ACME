import axios from "axios";
import { API_URL } from "./url";

export const registerUser = async ({
  username,
  email,
  password,
  fullname,
  profile,
}: any) => {
  try {
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
  } catch (error: any) {
    console.log(error);
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
