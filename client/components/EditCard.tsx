import React, { useState } from "react";
import {
   Button,
   Modal,
   ModalOverlay,
   ModalContent,
   ModalHeader,
   ModalFooter,
   ModalBody,
   useDisclosure,
   ModalCloseButton,
   Editable,
   EditablePreview,
   MenuItem,
   useToast,
   EditableInput,
   Input,
   ButtonGroup,
   Flex,
   IconButton,
   useEditableControls,
} from "@chakra-ui/react";
import { API_URL } from "../pages/api/url";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import axios from "axios";
import router from "next/router";

export function EditPostCard({ postid }: any) {
   const toast = useToast();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [oldContent, setOldContent] = useState("");
   const [newContent, setNewContent] = useState("");

   const initialRef = React.useRef(null);
   const finalRef = React.useRef(null);

   const getPostById = async () => {
      try {
         const response = await axios.get(`${API_URL}/thispost/${postid}`);

         setOldContent(response.data.Content);
         return response;
      } catch (error: any) {
         toast({
            title: error?.response?.data ?? "Server Error",
            position: "top-right",
            status: "error",
            isClosable: true,
         });
      }
   };

   getPostById();

   const editPost = async () => {
      try {
         const response = await axios.patch(
            `${API_URL}/@my-post/${postid}`,
            { Content: newContent },
            {
               withCredentials: true,
            }
         );
         if (response.status == 200) {
            toast({
               title: `Post edited`,
               position: "top-right",
               status: "success",
               isClosable: true,
            });
         }

         router.replace(router.asPath);
         setOldContent(response.data?.old?.content);

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

   /* Here's a custom control */
   function EditableControls() {
      const {
         isEditing,
         getSubmitButtonProps,
         getCancelButtonProps,
         getEditButtonProps,
      } = useEditableControls();

      return isEditing ? (
         <ButtonGroup justifyContent="center" size="sm">
            <IconButton
               aria-label={""}
               icon={<CheckIcon />}
               {...getSubmitButtonProps()}
            />

            <IconButton
               aria-label={""}
               icon={<CloseIcon />}
               {...getCancelButtonProps()}
            />
         </ButtonGroup>
      ) : (
         <Flex justifyContent="center">
            <IconButton
               aria-label={""}
               size="sm"
               icon={<EditIcon />}
               {...getEditButtonProps()}
            />
         </Flex>
      );
   }

   return (
      <>
         <form
            onSubmit={(e: any) => {
               e.preventDefault();
               editPost();
            }}
            action={`${API_URL}/@my-post/${postid}`}
            method="PATCH"
            id="editform"
         >
            <MenuItem
               onClick={() => {
                  onOpen();
                  getPostById();
               }}
               icon={<EditIcon />}
            >
               Edit Post
            </MenuItem>

            <Modal
               initialFocusRef={initialRef}
               finalFocusRef={finalRef}
               isOpen={isOpen}
               onClose={onClose}
            >
               <ModalOverlay />
               <ModalContent>
                  <ModalHeader>Edit your post</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody pb={6}>
                     <Editable
                        textAlign="center"
                        defaultValue={oldContent}
                        fontSize="2xl"
                        isPreviewFocusable={false}
                     >
                        <EditablePreview />
                        <Input
                           name="content"
                           form="editform"
                           onChange={(e: any) => setNewContent(e.target.value)}
                           as={EditableInput}
                        />
                        <EditableControls />
                     </Editable>
                  </ModalBody>
                  <ModalFooter>
                     <Button
                        onClick={() => {
                           onClose();
                           editPost();
                        }}
                        colorScheme="blue"
                        mr={3}
                     >
                        Save
                     </Button>
                     <Button onClick={onClose}>Cancel</Button>
                  </ModalFooter>
               </ModalContent>
            </Modal>
         </form>
      </>
   );
}
