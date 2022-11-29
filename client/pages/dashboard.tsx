import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import AddPostModal from "../components/AddPostModal";
import PostCard from "../components/Card";
import { AcmeLogo } from "../components/icons/Logo";
import { SearchIcon } from "../components/icons/SearchIcon";
import { logout } from "./api/auth";
import { API_URL } from "./api/url";
import { user } from "./api/auth";

export default function Dashboard({ posts }: any) {
   return (
      <>
         <Navbar isBordered variant="sticky">
            <Navbar.Brand css={{ mr: "$4" }}>
               <AcmeLogo />
               <Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
                  ACME
               </Text>
            </Navbar.Brand>
            <Navbar.Content
               css={{
                  "@xsMax": {
                     w: "100%",
                     jc: "space-between",
                  },
               }}
            >
               <Navbar.Item
                  css={{
                     "@xsMax": {
                        w: "100%",
                        jc: "center",
                     },
                  }}
               >
                  <Input
                     clearable
                     contentLeft={
                        <SearchIcon
                           fill="var(--nextui-colors-accents6)"
                           size={16}
                        />
                     }
                     contentLeftStyling={false}
                     css={{
                        w: "100%",
                        "@xsMax": {
                           mw: "300px",
                        },
                        "& .nextui-input-content--left": {
                           h: "100%",
                           ml: "$4",
                           dflex: "center",
                        },
                     }}
                     placeholder="Search..."
                  />
               </Navbar.Item>
               <Dropdown placement="bottom-right">
                  <Navbar.Item>
                     <Dropdown.Trigger>
                        <Avatar
                           bordered
                           as="button"
                           color="primary"
                           size="md"
                           src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                        />
                     </Dropdown.Trigger>
                  </Navbar.Item>
                  <Dropdown.Menu
                     aria-label="User menu actions"
                     color="primary"
                     onAction={(actionKey) => {
                        if (actionKey === "logout") {
                           logout();
                           localStorage.removeItem("user");
                        }
                     }}
                  >
                     <Dropdown.Item key="profile" css={{ height: "$18" }}>
                        <Text b color="inherit" css={{ d: "flex" }}>
                           Signed in as
                        </Text>
                        <Text b color="inherit" css={{ d: "flex" }}>
                           {user?.email}
                           {/* Hello */}
                        </Text>
                     </Dropdown.Item>
                     <Dropdown.Item key="settings" withDivider>
                        Change Theme
                     </Dropdown.Item>
                     <Dropdown.Item key="edit">Edit Profile</Dropdown.Item>
                     <Dropdown.Item key="logout" color="error">
                        Logout
                     </Dropdown.Item>
                  </Dropdown.Menu>
               </Dropdown>
            </Navbar.Content>
         </Navbar>
         <PostCard posts={posts} />

         <AddPostModal />
      </>
   );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
   const res = await axios.get(`${API_URL}/dashboard`, {
      withCredentials: true,
   });
   const posts = res.data;

   return {
      props: {
         posts: JSON.parse(JSON.stringify(posts)),
      },
   };
};
