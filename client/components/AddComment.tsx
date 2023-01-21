import React, { useEffect, useState } from "react";
import {
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   ModalCloseButton,
   useDisclosure,
   Button,
   useToast,
   IconButton,
   Textarea,
   Center,
   Card,
} from "@chakra-ui/react";
import { BiChat, BiSend } from "react-icons/bi";
import { API_URL } from "../pages/api/url";
import axios from "axios";
import router from "next/router";

const AddComment = ({ postid }: any) => {
   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [user, setUser] = useState<any>();
   const [reply, setReply] = useState("");

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

   const userid = user?.ID;

   // const addComment = async () => {
   //    try {
   //       const response = await axios.post(
   //          `${API_URL}/add-comment`,
   //          {
   //             userid,
   //             reply,
   //             postid,
   //          },
   //          { withCredentials: true }
   //       );
   //       if (response.status == 200) {
   //          toast({
   //             title: `Comment added successfully`,
   //             position: "top-right",
   //             status: "success",
   //             isClosable: true,
   //          });
   //       }

   //       router.replace(router.asPath);
   //       return response;
   //    } catch (error: any) {
   //       toast({
   //          title: error?.response?.data ?? "Server Error",
   //          position: "top-right",
   //          status: "error",
   //          isClosable: true,
   //       });
   //       console.log(error);
   //    }
   // };
   return (
      <>
         <form
            onSubmit={(e: any) => {
               e.preventDefault();
               addComment();
            }}
            action={`${API_URL}/add-comment`}
            method="POST"
            id="commentform"
         >
            <Button
               onClick={onOpen}
               // flex="2"
               variant="ghost"
               leftIcon={<BiChat />}
            >
               Comment
            </Button>
            {/* <Button onClick={onOpen}>Comments</Button> */}
            <Modal
               isCentered
               onClose={onClose}
               isOpen={isOpen}
               motionPreset="slideInBottom"
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Comments</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                     <Card></Card>
                  </ModalBody>
                  <ModalFooter>
                     <Textarea
                        size={"md"}
                        form="commentform"
                        onChange={(e: any) => setReply(e.target.value)}
                     />
                     <IconButton
                        onClick={() => {
                           onClose();
                           addComment();
                        }}
                        ml={5}
                        icon={<BiSend />}
                        aria-label={""}
                     />
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </form>
      </>
   );
};

export default AddComment;
