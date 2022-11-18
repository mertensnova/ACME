import React, { useState } from "react";
import {
  Input,
  Spacer,
  Container,
  Text,
  Button,
  Link,
} from "@nextui-org/react";
import { API_URL } from "./api/url";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data));
        window.location.href = "/dashboard";
      }
      return response.data;
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} action={`${API_URL}/login`} method="POST">
        <Container
          lg={true}
          display="flex"
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Text h1 size={60} weight="bold">
            Login
          </Text>
          <Text h5 weight="bold">
            If you dont't have an account then{" "}
            <Link color="primary" href="/register">
              Signup...
            </Link>
          </Text>
          <Spacer y={2.5} />
          <Input
            clearable
            underlined
            labelPlaceholder="Username"
            initialValue="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Spacer y={2.5} />
          <Spacer y={2.5} />
          <Input
            clearable
            underlined
            type={"password"}
            labelPlaceholder="Password"
            initialValue="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Spacer y={1.5} />
          <Button type="submit" color="primary" auto ghost>
            Signup
          </Button>
        </Container>
      </form>
    </>
  );
};

export default Login;
