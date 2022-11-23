import { Modal, useModal, Button, Text, Link } from "@nextui-org/react";

export default function ViewPost() {
  const { setVisible, bindings } = useModal();

  return (
    <div>
      <Link color="primary" onClick={() => setVisible(true)}>
        Read More...
      </Link>
      <Modal
        blur
        scroll
        width="600px"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        {...bindings}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Modal with a lot of content
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text id="modal-description">
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
            ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            ege dapibus ac facilisis in, egestas eget quam. Morbi leo risus,
            porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Cras mattis consectetur
            purus sit amet fermentum. Cras justo odio, dapibus ac facilisis in,
            egestas eget quam. Morbi leo risus, porta ac consectetur ac,
            vestibulum at eros. Praesent commodo cursus magna, vel scelerisque
            nisl consectetur et.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={() => setVisible(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
