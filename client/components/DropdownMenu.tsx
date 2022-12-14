import React, { useEffect, useRef, useState } from "react";
import {
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   IconButton,
} from "@chakra-ui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { BiUser } from "react-icons/bi";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import { API_URL } from "../pages/api/url";
import { useRouter } from "next/router";
import axios from "axios";
import { EditPostCard } from "./EditCard";

const DropdownMenu = (userID: any) => {
   const [user, setUser] = useState<any>();
   const router = useRouter();
   // const [id,setID] = useState()

   const toast = useToast();

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

   const deletePost = async (e: any) => {
      try {
         const postId = parseInt(e);
         const response = await axios.delete(
            `${API_URL}/post/${postId}`,

            { withCredentials: true }
         );
         if (response.status == 200) {
            toast({
               title: `Post deleted successfully`,
               position: "top-right",
               status: "success",
               isClosable: true,
            });
         }
         router.replace(router.asPath);

         return response.data;
      } catch (error) {
         toast({
            title: `Server error`,
            position: "top-right",
            status: "error",
            isClosable: true,
         });
         console.log(error);
      }
   };

   return (
      <Menu>
         <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsThreeDotsVertical />}
            variant="outline"
         />
         <MenuList>
            {user?.ID == userID?.userid ? (
               <div>
                  <EditPostCard />

                  <MenuItem
                     onClick={(e: any) => {
                        deletePost(
                           e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.getAttribute(
                              "data-key"
                           )
                        );
                     }}
                     icon={<DeleteIcon />}
                  >
                     Delete Post
                  </MenuItem>
               </div>
            ) : (
               <MenuItem
                  onClick={() => router.push(`/user/${userID?.userid}`)}
                  icon={<BiUser />}
               >
                  View User
               </MenuItem>
            )}
         </MenuList>
      </Menu>
   );
};

export default DropdownMenu;
