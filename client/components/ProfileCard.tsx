import React from "react";
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
               size={"xl"}
               src={`${API_URL}/${data?.posts[0]?.Profile}`}
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
               @{data?.posts[0]?.Fullname}
            </Heading>
            <Text fontWeight={600} color={"gray.500"} mb={4}>
               @{data?.posts[0]?.Username}
            </Text>
            <Text
               textAlign={"center"}
               color={useColorModeValue("gray.700", "gray.400")}
               px={3}
            >
               Actress, musician, songwriter and artist. PM for work inquires or{" "}
               me in your posts
            </Text>
         </Box>
      </Center>
   );
}
