import React from "react";
import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import { AcmeLogo } from "./icons/Logo";
import { SearchIcon } from "./icons/SearchIcon";
import { logout } from "../pages/api/auth";
import { user } from "../pages/api/auth";
import { API_URL } from "../pages/api/url";

const NavBar = () => {
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
                           size="lg"
                           src={`${API_URL}/${user?.image}`}
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
      </>
   );
};

export default NavBar;
