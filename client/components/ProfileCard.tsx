import React, { useEffect, useState } from "react";
import { API_URL } from "../pages/api/url";
import {
   Heading,
   Avatar,
   Box,
   Center,
   Text,
   useColorModeValue,
} from "@chakra-ui/react";

export default function ProfileCard({ data }: any) {
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
      <Center py={6}>
         <Box
            maxW={"320px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.900")}
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
         >
            <Avatar
               name={data?.user?.fullname}
               size={"xl"}
               src={`${API_URL}/${data?.user?.profile}`}
               mb={4}
               pos={"relative"}
               _after={{
                  content: '""',
                  w: 4,
                  h: 4,
                  bg: "green.300",
                  border: "2px solid white",
                  rounded: "full",
                  pos: "absolute",
                  bottom: 0,
                  right: 3,
               }}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"}>
               {data?.user?.fullname}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
               @{data?.user?.username}
            </Text>
            <Text
               textAlign={"center"}
               color={useColorModeValue("gray.700", "gray.400")}
               px={3}
            >
               {data?.user?.bio}
            </Text>
         </Box>
      </Center>
   );
}
