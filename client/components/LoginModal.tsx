import React, { useState } from "react";
import { Modal, Button, Text, Input, Row, Checkbox } from "@nextui-org/react";
import { Password } from "../components/icons/Password";
import { API_URL } from "../pages/api/url";
import User from "../components/icons/User";
import { loginUser } from "../pages/api/auth";

export default function LoginModal() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <div>
        <Button auto light onClick={handler}>
          Login
        </Button>
        <form
          onSubmit={(e: any) => {
            e.preventDefault();
            loginUser({ username, password });
          }}
          action={`${API_URL}/login`}
          method="POST"
          id="loginform"
        >
          <Modal
            closeButton
            blur
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
              <Button type="submit" auto form="loginform">
                Login
              </Button>
            </Modal.Footer>
          </Modal>
        </form>
      </div>
    </>
  );
}
