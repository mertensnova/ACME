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
import Link from "next/link";

const DropdownMenu = (userID: any) => {
   const [user, setUser] = useState<any>();

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

   return (
      <Menu>
         <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<BsThreeDotsVertical />}
            variant="outline"
         />
         <MenuList>
            {/* <MenuItem icon={<BiUser />}> */}
            <Link href="/user/[id]" as={`/user/${userID?.userid}`}>
               View User
            </Link>
            {/* </MenuItem> */}
            {user?.ID == userID?.userid ? (
               <div>
                  <MenuItem icon={<EditIcon />}>Edit Post</MenuItem>
                  <MenuItem icon={<DeleteIcon />}>Delete Post</MenuItem>
               </div>
            ) : (
               <div></div>
            )}
         </MenuList>
      </Menu>
   );
};

export default DropdownMenu;
