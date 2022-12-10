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
import { registerUser } from "../pages/api/auth";

export default function Signup() {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [fullname, setFullname] = useState("");
   const [image, setImage] = useState(null);
   const { isOpen, onOpen, onClose } = useDisclosure();
   const initialRef = React.useRef(null);
   const finalRef = React.useRef(null);

   const handleImage = (e: any) => {
      const file = e.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e: any) => {
         setImage(e.target.result);
      };
      fileReader.readAsDataURL(file);
   };

   return (
      <>
         <Button
            rounded={"full"}
            bg={"blue.400"}
            color={"white"}
            _hover={{
               bg: "blue.500",
            }}
            onClick={onOpen}
         >
            Sign up
         </Button>
         <form
            onSubmit={(e: any) => {
               e.preventDefault();

               registerUser({ username, email, password, fullname, image });
            }}
            method="post"
            action={`${API_URL}/register`}
            encType="multipart/form-data"
            id="signform"
         >
            <Modal
               initialFocusRef={initialRef}
               finalFocusRef={finalRef}
               isOpen={isOpen}
               onClose={onClose}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader> Register account</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                     <FormControl>
                        <FormLabel>Fullname</FormLabel>
                        <Input
                           type={"text"}
                           ref={initialRef}
                           name="Fullname"
                           value={username}
                           placeholder="Fullname"
                           onChange={(e: any) => setFullname(e.target.value)}
                        />

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
                     <FormLabel>Email</FormLabel>
                     <Input
                        type={"text"}
                        ref={initialRef}
                        name="Email"
                        value={email}
                        placeholder="Email"
                        onChange={(e: any) => setEmail(e.target.value)}
                     />

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
                        form="signform"
                        type="submit"
                        colorScheme="blue"
                        mr={3}
                     >
                        Signup
                     </Button>
                     <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </form>
      </>
   );
}
