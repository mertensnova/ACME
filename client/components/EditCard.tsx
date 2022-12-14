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
   EditableTextarea,
} from "@chakra-ui/react";
import { API_URL } from "../pages/api/url";
import { EditIcon } from "@chakra-ui/icons";

export function EditPostCard() {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [content, setContent] = useState("Hello World");

   const initialRef = React.useRef(null);
   const finalRef = React.useRef(null);

   // const editPost = async (postId: any) => {
   //    console.log(postId);
   //    try {
   //       const response = await axios.patch(`${API_URL}/@my-post/${postId}`, {
   //          withCredentials: true,
   //       });
   //       if (response.status == 200) {
   //          toast({
   //             title: `Post edited`,
   //             position: "top-right",
   //             status: "success",
   //             isClosable: true,
   //          });
   //       }
   //       router.replace(router.asPath);
   //       return response.data;
   //    } catch (error) {
   //       toast({
   //          title: `Server error`,
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
               // editPost(e);
            }}
            action={`${API_URL}/@my-post/:id`}
            method="POST"
            id="postform"
         >
            <MenuItem onClick={onOpen} icon={<EditIcon />}>
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
                     <Editable defaultValue={content}>
                        <EditablePreview />
                        <EditableTextarea />
                     </Editable>
                  </ModalBody>
                  <ModalFooter>
                     <Button
                        // onClick={(e: any) => editPost(e)}
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
