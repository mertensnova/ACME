import React, { useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { Mail } from "./icons/Mail";
import { Password } from "./icons/Password";
import { API_URL } from "../pages/api/url";
import axios from "axios";
import User from "./icons/User";

export default function SignInModal() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    // e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/register`, {
        username,
        email,
        password,
      });
      if (response.status === 200) {
        localStorage.setItem("user", response.data);
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const closeHandler = () => {
    setVisible(false);
    // console.log("closed");
  };

  return (
    <>
      <form
        // onSubmit={handleSubmit}
        action={`${API_URL}/register`}
        method="POST"
      >
        <div>
          <Button auto flat onClick={handler}>
            Sign Up
          </Button>
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Sign up for
                <Text b size={18}>
                  ACME
                </Text>
              </Text>
            </Modal.Header>

            <Modal.Body>
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                type={"text"}
                name="Username"
                value={username}
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                contentLeft={<User fill="currentColor" />}
              />
              <Input
                clearable
                name="Email"
                bordered
                fullWidth
                color="primary"
                size="lg"
                placeholder="Email"
                value={email}
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
                contentLeft={<Mail fill="currentColor" />}
              />
              <Input
                clearable
                bordered
                fullWidth
                color="primary"
                size="lg"
                type={"password"}
                name="Password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                contentLeft={<Password fill="currentColor" />}
              />
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onClick={closeHandler}>
                Close
              </Button>
              <Button flat onPress={handleSubmit} type="submit" auto>
                Sign in
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </form>
    </>
  );
}
