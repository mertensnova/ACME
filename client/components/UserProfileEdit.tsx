import {
   Button,
   Flex,
   FormControl,
   FormLabel,
   Heading,
   Input,
   Stack,
   useColorModeValue,
   HStack,
   Avatar,
   AvatarBadge,
   IconButton,
   Center,
   Textarea,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { API_URL } from "../pages/api/url";
import { useRouter } from "next/router";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

export default function UserProfileEdit(): JSX.Element {
   const toast = useToast();
   const [username, setUsername] = useState("");
   const [fullname, setFullname] = useState("");
   const [bio, setBio] = useState("");
   const [user, setUser] = useState<any>();
   const id = user?.ID;
   const router = useRouter();

   const updateUser = async ({ username, fullname, id, bio }: any) => {
      try {
         const response = await axios.patch(`${API_URL}/@me`, {
            id,
            username,
            fullname,
            bio,
         });
         if (response.status === 200) {
            toast({
               title: `Updated successfully`,
               position: "top-right",
               status: "success",
               isClosable: true,
            });
            localStorage.setItem("user", JSON.stringify(response.data));
            window.location.href = "/dashboard";
         }

         return response;
      } catch (error) {
         toast({
            title:  `Error has occurred`,
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
         <form
            onSubmit={(e: any) => {
               e.preventDefault();
               updateUser({ username, fullname, id, bio });
            }}
            action={`${API_URL}/@me`}
            method="POST"
            id="editform"
         >
            <Flex
               minH={"100vh"}
               align={"center"}
               justify={"center"}
               bg={useColorModeValue("gray.50", "gray.800")}
            >
               <Stack
                  spacing={4}
                  w={"full"}
                  maxW={"md"}
                  bg={useColorModeValue("white", "gray.700")}
                  rounded={"xl"}
                  boxShadow={"lg"}
                  p={6}
                  my={12}
               >
                  <Heading
                     lineHeight={1.1}
                     fontSize={{ base: "2xl", sm: "3xl" }}
                  >
                     User Profile Edit
                  </Heading>
                  <FormControl id="userName">
                     <FormLabel>User Icon</FormLabel>
                     <Stack direction={["column", "row"]} spacing={6}>
                        <Center>
                           <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                              <AvatarBadge
                                 as={IconButton}
                                 size="sm"
                                 rounded="full"
                                 top="-10px"
                                 colorScheme="red"
                                 aria-label="remove Image"
                                 icon={<SmallCloseIcon />}
                              />
                           </Avatar>
                        </Center>
                        <Center w="full">
                           <Button w="full">Change Icon</Button>
                        </Center>
                     </Stack>
                  </FormControl>
                  <FormControl mt={4} isRequired>
                     <FormLabel>Fullname</FormLabel>
                     <Input
                        type={"text"}
                        name="Fullname"
                        value={fullname}
                        placeholder="Fullname"
                        onChange={(e: any) => setFullname(e.target.value)}
                     />
                  </FormControl>
                  <FormControl id="userName" isRequired>
                     <FormLabel>User name</FormLabel>
                     <Input
                        placeholder="UserName"
                        _placeholder={{ color: "gray.500" }}
                        type="text"
                        name="Username"
                        value={username}
                        onChange={(e: any) => setUsername(e.target.value)}
                     />
                  </FormControl>
                  <FormControl mt={4}>
                     <FormLabel>Bio</FormLabel>
                     <Textarea
                        name="Bio"
                        value={bio}
                        placeholder="Bio"
                        onChange={(e: any) => setBio(e.target.value)}
                     />
                  </FormControl>

                  <Stack spacing={6} direction={["column", "row"]}>
                     <Button
                        bg={"red.400"}
                        color={"white"}
                        w="full"
                        _hover={{
                           bg: "red.500",
                        }}
                     >
                        Cancel
                     </Button>
                     <Button
                        onClick={() => localStorage.removeItem("user")}
                        type="submit"
                        form="editform"
                        bg={"blue.400"}
                        color={"white"}
                        w="full"
                        _hover={{
                           bg: "blue.500",
                        }}
                     >
                        Submit
                     </Button>
                  </Stack>
               </Stack>
            </Flex>
         </form>
      </>
   );
}
