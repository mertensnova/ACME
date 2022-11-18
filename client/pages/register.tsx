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

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        action={`${API_URL}/register`}
        method="POST"
      >
        <Container
          lg={true}
          display="flex"
          direction="column"
          alignItems="center"
          justify="center"
        >
          <Text h1 size={60} weight="bold">
            Sign-up
          </Text>
          <Text h5 weight="bold">
            If you already have an account then{" "}
            <Link color={"primary"} href="/login">
              Login...
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
          <Input
            clearable
            underlined
            type={"email"}
            labelPlaceholder="Email"
            initialValue="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
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

export default Register;
