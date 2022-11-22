import React, { useState } from "react";
import { Modal, Button, Text, Textarea } from "@nextui-org/react";
import { API_URL } from "../pages/api/url";

export default function AddPostModal() {
  const handler = () => setVisible(true);
  const [visible, setVisible] = React.useState(false);

  const [content, setContent] = useState("");

  const closeHandler = () => {
    setVisible(false);
  };

  return (
    <>
      <form
        // onSubmit={() => registerUser({ content })}
        action={`${API_URL}/register`}
        method="POST"
        // encType="multipart/form-data"
      >
        <div>
          <Button auto flat onClick={handler}>
            Write
          </Button>
          <Modal
            blur
            closeButton
            aria-labelledby="modal-title"
            open={visible}
            onClose={closeHandler}
          >
            <Modal.Header>
              <Text id="modal-title" size={18}>
                Write
              </Text>
            </Modal.Header>

            <Modal.Body>
              <Textarea
                bordered
                name="Content"
                fullWidth
                color="primary"
                size="lg"
                placeholder="Content"
                labelPlaceholder="Bordered Textarea"
              />
            </Modal.Body>
            <Modal.Footer>
              <Button auto flat color="error" onClick={closeHandler}>
                Close
              </Button>
              <Button
                // onClick={() =>
                //   registerUser({ username, email, password, fullname, profile })
                // }
                flat
                type="submit"
                auto
                color={"success"}
              >
                Post
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </form>
    </>
  );
}
