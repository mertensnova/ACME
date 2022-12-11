import React, { useEffect, useState } from "react";
import {
   Drawer,
   DrawerBody,
   DrawerFooter,
   DrawerHeader,
   DrawerOverlay,
   Button,
   Box,
   Stack,
   Input,
   FormLabel,
   InputGroup,
   DrawerContent,
   DrawerCloseButton,
   useDisclosure,
   IconButton,
   useMediaQuery,
} from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import axios from "axios";
import { API_URL } from "../pages/api/url";
import { BsPenFill } from "react-icons/bs";

const WritePost = () => {
   const [isLessThan520] = useMediaQuery("(max-width: 520px)");
   const { isOpen, onOpen, onClose } = useDisclosure();
   const router = useRouter();
   const [user, setUser] = useState<any>();

   const userid = user?.ID;
   const [content, setContent] = useState("");

   useEffect(() => {
      if (typeof window !== "undefined") {
         try {
            setUser(JSON.parse(localStorage.getItem("user") ?? ""));
         } catch (error) {
            console.log(error);
         }
      } else {
         console.log("You are on the server");
      }
   }, []);

   const addPost = async () => {
      try {
         const response = await axios.post(
            `${API_URL}/add-post`,
            {
               userid,
               content,
            },
            { withCredentials: true }
         );

         router.replace(router.asPath);
         return response;
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         {isLessThan520 ? (
            <IconButton
               pos="fixed"
               bottom="80px"
               right="80px"
               zIndex={10}
               borderRadius={9999}
               width={"60px"}
               height={"60px"}
               icon={<BsPenFill />}
               colorScheme="blue"
               onClick={onOpen}
               aria-label={""}
            ></IconButton>
         ) : (
            <IconButton
               pos="fixed"
               bottom="150px"
               right="160px"
               zIndex={10}
               borderRadius={9999}
               width={"60px"}
               height={"60px"}
               icon={<BsPenFill />}
               colorScheme="blue"
               onClick={onOpen}
               aria-label={""}
            ></IconButton>
         )}

         <form
            onSubmit={(e: any) => {
               e.preventDefault();
               addPost();
            }}
            action={`${API_URL}/add-post`}
            method="POST"
            id="postform"
         >
            <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
               <DrawerOverlay />
               <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader borderBottomWidth="1px">
                     Create a post
                  </DrawerHeader>

                  <DrawerBody>
                     <Stack spacing="24px">
                        <Box>
                           <FormLabel htmlFor="desc">Content</FormLabel>
                           <Textarea
                              form="postform"
                              onChange={(e: any) => setContent(e.target.value)}
                              id="desc"
                           />
                        </Box>
                     </Stack>
                  </DrawerBody>

                  <DrawerFooter borderTopWidth="1px">
                     <Button variant="outline" mr={3} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button
                        onClick={onClose}
                        form="postform"
                        type="submit"
                        colorScheme="blue"
                     >
                        Submit
                     </Button>
                  </DrawerFooter>
               </DrawerContent>
            </Drawer>
         </form>
      </>
   );
};

export default WritePost;
