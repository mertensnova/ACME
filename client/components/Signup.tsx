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
   InputRightElement,
   InputGroup,
   Textarea,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { API_URL } from "../pages/api/url";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

export default function Signup() {
   const toast = useToast();
   const [showPassword, setShowPassword] = useState(false);
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [fullname, setFullname] = useState("");
   const [bio, setBio] = useState("");
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

   const registerUser = async ({
      username,
      email,
      password,
      fullname,
      image,
      bio,
   }: any) => {
      try {
         const response = await axios.post(
            `${API_URL}/register`,
            {
               username,
               email,
               password,
               fullname,
               image,
               bio,
            },
            { withCredentials: true }
         );

         if (response.status === 200) {
            toast({
               title: `Registered successfully`,
               position: "top-right",
               status: "success",
               isClosable: true,
            });
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = "/dashboard";
         }

         return response.data;
      } catch (error: any) {
         toast({
            title: error?.response?.data ?? "Server Error",
            position: "top-right",
            status: "error",
            isClosable: true,
         });
         console.log(error);
      }
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

               registerUser({
                  username,
                  email,
                  password,
                  fullname,
                  image,
                  bio,
               });
            }}
            method="post"
            action={`${API_URL}/register`}
            encType="multipart/form-data"
            id="signform"
         >
            <Modal
               size={"xl"}
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
                     <FormControl mt={4} isRequired>
                        <FormLabel>Fullname</FormLabel>
                        <Input
                           type={"text"}
                           ref={initialRef}
                           name="Fullname"
                           value={fullname}
                           placeholder="Fullname"
                           onChange={(e: any) => setFullname(e.target.value)}
                        />
                     </FormControl>
                     <FormControl mt={4} isRequired>
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
                     <FormControl mt={4} isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input
                           type={"text"}
                           ref={initialRef}
                           name="Email"
                           value={email}
                           placeholder="Email"
                           onChange={(e: any) => setEmail(e.target.value)}
                        />
                     </FormControl>

                     <FormControl isRequired mt={4}>
                        <FormLabel>Password</FormLabel>
                        <InputGroup>
                           <Input
                              name="Password"
                              value={password}
                              placeholder="Password"
                              onChange={(e) => setPassword(e.target.value)}
                              type={showPassword ? "text" : "password"}
                           />
                           <InputRightElement h={"full"}>
                              <Button
                                 variant={"ghost"}
                                 onClick={() =>
                                    setShowPassword(
                                       (showPassword) => !showPassword
                                    )
                                 }
                              >
                                 {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                              </Button>
                           </InputRightElement>
                        </InputGroup>
                     </FormControl>
                     <FormControl mt={4}>
                        <FormLabel>Bio</FormLabel>
                        <Textarea
                           ref={initialRef}
                           name="Bio"
                           value={bio}
                           placeholder="Bio"
                           onChange={(e: any) => setBio(e.target.value)}
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
