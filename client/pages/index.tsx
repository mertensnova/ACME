import Head from "next/head";
import { AcmeLogo } from "../components/icons/AcmeLogo";

import {
   Flex,
   Heading,
   Image,
   Stack,
   Text,
   useBreakpointValue,
} from "@chakra-ui/react";
import Login from "../components/Login";
import Signup from "../components/Signup";

export default function Home() {
   return (
      <>
         <Head>
            <title>Social</title>
            <meta name="description" content="Made by Amr Ashebo" />
            <link rel="icon" href="/favicon.ico" />
         </Head>
         <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
            <Flex p={8} flex={1} align={"center"} justify={"center"}>
               <Stack spacing={6} w={"full"} maxW={"lg"}>
                  <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                     <Text
                        as={"span"}
                        position={"relative"}
                        _after={{
                           content: "''",
                           width: "full",
                           height: useBreakpointValue({
                              base: "20%",
                              md: "30%",
                           }),
                           position: "absolute",
                           bottom: 1,
                           left: 0,
                           bg: "blue.400",
                           zIndex: -1,
                        }}
                     >
                        <AcmeLogo /> ACME
                     </Text>
                     <br />{" "}
                     <Text color={"blue.400"} as={"span"}>
                        Write your thoughts
                     </Text>{" "}
                  </Heading>
                  <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
                     We are making it easy for you to write and publish your
                     thoughts. We have a simple, clean interface, so you can get
                     started right away.
                  </Text>
                  <Stack direction={{ base: "column", md: "row" }} spacing={4}>
                     <Signup />
                     <Login />
                  </Stack>
               </Stack>
            </Flex>
            <Flex flex={1}>
               <Image
                  alt={"Login Image"}
                  objectFit={"cover"}
                  src={
                     "https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
                  }
               />
            </Flex>
         </Stack>
      </>
   );
}
