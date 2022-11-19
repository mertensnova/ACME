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
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
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

  const closeHandler = () => {
    setVisible(false);
    // console.log("closed");
  };

  return (
    <>
      <div>
        <Button auto light onClick={handler}>
          Login
        </Button>
        <form onSubmit={handleSubmit} action={`${API_URL}/login`} method="POST">
          <Modal
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Login for
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
              <Row justify="space-between">
                <Checkbox>
                  <Text size={14}>Remember me</Text>
                </Checkbox>
                <Text size={14}>Forgot password?</Text>
              </Row>
            </Modal.Body>

            <Modal.Footer>
              <Button auto flat color="error" onClick={closeHandler}>
                Close
              </Button>
              <Button onPress={handleSubmit} type="submit" auto>
                Login
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    </>
  );
}
