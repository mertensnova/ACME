import { ReactNode, useEffect, useState } from "react";
import {
   Box,
   Flex,
   Avatar,
   Link,
   Button,
   Menu,
   MenuButton,
   MenuList,
   MenuItem,
   MenuDivider,
   useDisclosure,
   useColorModeValue,
   Stack,
   useColorMode,
   Center,
   Text,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { API_URL } from "../pages/api/url";
import { AcmeLogo } from "./icons/AcmeLogo";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import axios from "axios";

const NavLink = ({ children }: { children: ReactNode }) => (
   <Link
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
         textDecoration: "none",
         bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
   >
      {children}
   </Link>
);

export default function Navigation() {
   const { colorMode, toggleColorMode } = useColorMode();
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [user, setUser] = useState<any>();
   const router = useRouter();

   const toast = useToast();

   const logout = async () => {
      try {
         const resp = await axios.get(`${API_URL}/logout`, {
            withCredentials: true,
         });
         if (resp.status == 200) {
            toast({
               title: `You have been logged out`,
               position: "top-right",
               status: "success",
               isClosable: true,
            });
            window.location.href = "/";
         }

         return resp;
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
      <>
         <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
            <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
               <Box onClick={() => router.push("/dashboard")}>
                  <AcmeLogo />
               </Box>

               <Flex alignItems={"center"}>
                  <Stack direction={"row"} spacing={7}>
                     <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                     </Button>

                     <Menu>
                        <MenuButton
                           as={Button}
                           rounded={"full"}
                           variant={"link"}
                           cursor={"pointer"}
                           minW={0}
                        >
                           <Avatar
                              name={user?.fullname}
                              size={"sm"}
                              src={`${API_URL}/${user?.image}`}
                           />
                        </MenuButton>
                        <MenuList alignItems={"center"}>
                           <Center>
                              <Avatar
                                 name={user?.fullname}
                                 size={"2xl"}
                                 src={`${API_URL}/${user?.image}`}
                              />
                           </Center>

                           <Center>
                              <Text py={5}>{user?.email}</Text>
                           </Center>

                           <MenuDivider />
                           <MenuItem
                              onClick={() => router.push(`/user/${user?.ID}`)}
                           >
                              Your Profile
                           </MenuItem>

                           <MenuItem onClick={() => router.push("/@me")}>
                              Edit Profile
                           </MenuItem>
                           <MenuItem
                              onClick={() => {
                                 localStorage.removeItem("user");
                                 logout();
                              }}
                              color={"red"}
                           >
                              Logout
                           </MenuItem>
                        </MenuList>
                     </Menu>
                  </Stack>
               </Flex>
            </Flex>
         </Box>
      </>
   );
}
