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
import { logout } from "../pages/api/auth";

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
               {/* <Box>
                  <AcmeLogo />
               </Box> */}

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
                              size={"sm"}
                              src={`${API_URL}/${user?.image}`}
                           />
                        </MenuButton>
                        <MenuList alignItems={"center"}>
                           <Center>
                              <Avatar
                                 size={"2xl"}
                                 src={`${API_URL}/${user?.image}`}
                              />
                           </Center>

                           <Center>
                              <Text>{user?.username}</Text>
                           </Center>

                           <MenuDivider />
                           <MenuItem>Your Servers</MenuItem>
                           <MenuItem>Edit Profile</MenuItem>
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
