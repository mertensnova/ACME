import { Dropdown } from "@nextui-org/react";
import { EditPostIcon } from "./icons/EditIcon";
import { DeletePostIcon } from "./icons/DeleteIcon";
import Link from "next/link";
import { UserIcon } from "./icons/User";
import { user } from "../pages/api/auth";

export default function CardDropdownMenu({ userID }: any) {
   return (
      <Dropdown>
         <Dropdown.Button flat color="primary"></Dropdown.Button>
         <Dropdown.Menu color="primary" aria-label="Actions">
            <Dropdown.Item
               key="new"
               icon={<UserIcon size={22} fill="var(--nextui-colors-primary)" />}
            >
               <Link href="/user/[id]" as={`/user/${userID}`} color={"white"}>
                  View Profile
               </Link>
            </Dropdown.Item>

            <Dropdown.Item
               key="edit"
               icon={
                  <EditPostIcon size={22} fill="var(--nextui-colors-primary)" />
               }
            >
               Edit Post
            </Dropdown.Item>
            <Dropdown.Item
               withDivider
               key="delete"
               color="error"
               icon={<DeletePostIcon size={22} fill="currentColor" />}
            >
               Delete Post
            </Dropdown.Item>
         </Dropdown.Menu>
      </Dropdown>
   );
}
