import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/url";
import PostCard from "../../../components/PostCard";
import ProfileCard from "../../../components/ProfileCard";
import Navigation from "../../../components/Navigation";
import {
   Text,
   Card,
   CardBody,
   CardHeader,
   Flex,
   Heading,
   useColorModeValue,
   Avatar,
   Box,
   Container,
   Button,
   CardFooter,
   IconButton,
   Textarea,
   useDisclosure,
   useToast,
} from "@chakra-ui/react";
import moment from "moment";
import DropdownMenu from "../../../components/DropdownMenu";
import { BiLike, BiSend } from "react-icons/bi";
import router from "next/router";
import Head from "next/head";

const Post = ({ post, comment }: any) => {
   console.log(comment);

   const toast = useToast();
   const [user, setUser] = useState<any>();
   const [reply, setReply] = useState("");
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

   const userid = user?.ID;
   const {
      ID,
      Fullname,
      Profile,
      Username,
      UserID,
      CreatedAt,
      Content,
      Likes,
   } = post;

   const addComment = async () => {
      try {
         const response = await axios.post(
            `${API_URL}/add-comment`,
            {
               userid,
               reply,
               ID,
            },
            { withCredentials: true }
         );
         if (response.status == 200) {
            toast({
               title: `Comment added successfully`,
               position: "top-right",
               status: "success",
               isClosable: true,
            });
            console.log(response);
         }

         router.replace(router.asPath);
         return response;
      } catch (error: any) {
         toast({
            title: error?.response?.data ?? "Server Error",
            position: "top-right",
            status: "error",
            isClosable: true,
         });
         console.log(error);
      }
   };

   return (
      <>
         <Head>
            <title>ACME</title>
         </Head>
         {/* console.log(comment); */}
         <Card data-key={ID} margin={"5"} key={ID} size={"lg"}>
            <CardHeader>
               <Flex>
                  <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
                     <Avatar name={Fullname} src={`${API_URL}/${Profile}`} />

                     <Box>
                        <Heading size="sm">{Fullname}</Heading>
                        <Text
                           // eslint-disable-next-line react-hooks/rules-of-hooks
                           color={useColorModeValue("gray.700", "gray.400")}
                        >
                           @{Username}
                        </Text>
                        <Text
                           // eslint-disable-next-line react-hooks/rules-of-hooks
                           color={useColorModeValue("gray.700", "gray.400")}
                        >
                           {moment(CreatedAt).startOf("second").fromNow()}
                        </Text>
                     </Box>
                  </Flex>
                  <DropdownMenu userid={UserID} postid={ID} />
               </Flex>
            </CardHeader>
            <CardBody>
               <Text>{Content}</Text>
            </CardBody>
         </Card>
         <Container>
            {comment?.map((e: any) => {
               const { ID, Reply, Fullname, Username, Likes } = e;

               return (
                  <Card data-key={ID} margin={"10"} key={ID} size={"sm"}>
                     <CardHeader>
                        <CardHeader>
                           <Box>
                              <Heading size="sm">{Fullname}</Heading>
                              <Text
                                 // eslint-disable-next-line react-hooks/rules-of-hooks
                                 color={useColorModeValue(
                                    "gray.700",
                                    "gray.400"
                                 )}
                              >
                                 @{Username}
                              </Text>
                              <Text
                                 // eslint-disable-next-line react-hooks/rules-of-hooks
                                 color={useColorModeValue(
                                    "gray.700",
                                    "gray.400"
                                 )}
                              >
                                 {moment(CreatedAt).startOf("second").fromNow()}
                              </Text>
                           </Box>
                        </CardHeader>
                     </CardHeader>
                     <Text margin={"5"}>{Reply}</Text>
                     <CardFooter
                        justify="space-between"
                        flexWrap="wrap"
                        sx={{
                           "& > button": {
                              minW: "136px",
                           },
                        }}
                     >
                        <Button
                           flex="3"
                           variant="ghost"
                           //    onClick={(e: any) => {
                           //       likePost(
                           //          e.target.parentElement.parentElement.getAttribute(
                           //             "data-key"
                           //          )
                           //       );
                           //    }}
                           leftIcon={<BiLike />}
                        >
                           Like {Likes}
                        </Button>
                        {/* <AddComment postid={ID} /> */}
                     </CardFooter>
                  </Card>
               );
            })}
         </Container>
         <form
            onSubmit={(e: any) => {
               e.preventDefault();
               addComment();
            }}
            action={`${API_URL}/add-comment`}
            method="POST"
            id="commentform"
         >
            <Flex>
               <Textarea
                  size={"md"}
                  form="commentform"
                  onChange={(e: any) => setReply(e.target.value)}
               />
               <IconButton
                  type="submit"
                  onClick={() => {
                     addComment();
                  }}
                  ml={5}
                  icon={<BiSend />}
                  aria-label={""}
               />
            </Flex>
         </form>
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
   const resPost = await axios.get(`${API_URL}/thispost/${context.params.id}`);
   const resCommnet = await axios.get(
      `${API_URL}/get-comments/${context.params.id}`
   );
   const post = await resPost.data;
   const comment = await resCommnet.data;

   return {
      props: {
         post: post,
         comment: comment,
      },
   };
};

export default Post;
