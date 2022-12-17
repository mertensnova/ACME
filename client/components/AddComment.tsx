import React from "react";
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
   Input,
   IconButton,
   Card,
   CardHeader,
   Heading,
   CardBody,
   Avatar,
   Box,
   CardFooter,
   Flex,
   Text,
   useColorModeValue,
} from "@chakra-ui/react";
import { BiChat, BiLike, BiSend } from "react-icons/bi";
import WritePost from "./WritePost";
import PostCard from "./PostCard";
import moment from "moment";
import { API_URL } from "../pages/api/url";
import DropdownMenu from "./DropdownMenu";

const AddComment = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();
   return (
      <>
         <Button
            onClick={onOpen}
            flex="1"
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
                
               </ModalBody>
               <ModalFooter>
                  <Input />
                  <IconButton ml={5} icon={<BiSend />} aria-label={""} />
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default AddComment;
