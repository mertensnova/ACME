import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   Button,
   useDisclosure,
   FormControl,
   FormLabel,
   Input,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { API_URL } from "../pages/api/url";
import { loginUser } from "../pages/api/auth";

export default function Login() {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const { isOpen, onOpen, onClose } = useDisclosure();

   const initialRef = React.useRef(null);
   const finalRef = React.useRef(null);

   return (
      <>
         <Button rounded={"full"} onClick={onOpen}>
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
               initialFocusRef={initialRef}
               finalFocusRef={finalRef}
               isOpen={isOpen}
               onClose={onClose}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Login to your account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                     <FormControl>
                        <FormLabel>Username</FormLabel>
                        <Input
                           type={"text"}
                           ref={initialRef}
                           name="Username"
                           value={username}
                           placeholder="Username"
                           onChange={(e: any) => setUsername(e.target.value)}
                        />
                     </FormControl>

                     <FormControl mt={4}>
                        <FormLabel>Password</FormLabel>
                        <Input
                           name="Password"
                           value={password}
                           placeholder="Password"
                           onChange={(e) => setPassword(e.target.value)}
                           type={"password"}
                        />
                     </FormControl>
                  </ModalBody>

                  <ModalFooter>
                     <Button
                        form="loginform"
                        type="submit"
                        colorScheme="blue"
                        mr={3}
                     >
                        Login
                     </Button>
                     <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </form>
      </>
   );
}
