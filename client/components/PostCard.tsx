import React, { useEffect, useState } from "react";
import {
   Card,
   CardHeader,
   CardBody,
   CardFooter,
   Flex,
   Avatar,
   Heading,
   Box,
   Text,
   Button,
   useColorModeValue,
   Divider,
   Center,
   useMediaQuery,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { API_URL } from "../pages/api/url";
import WritePost from "./WritePost";
import { BiLike } from "react-icons/bi";
import axios from "axios";
import DropdownMenu from "./DropdownMenu";
import { useToast } from "@chakra-ui/react";
import moment from "moment";
import AddComment from "./AddComment";

const PostCard = ({ posts }: any) => {
   const toast = useToast();
   const [user, setUser] = useState<any>();
   const router = useRouter();
   const userId = user?.ID;
   const [isLessThan500] = useMediaQuery("(min-width: 500px)");

   const size = isLessThan500 ? "md" : "";

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

   const likePost = async (e: any) => {
      try {
         const postId = parseInt(e);
         const response = await axios.post(
            `${API_URL}/like-post`,
            { userId, postId },
            { withCredentials: true }
         );
         if (response.status == 200) {
            toast({
               title: `You liked the post`,
               position: "top-right",
               status: "success",
               isClosable: true,
            });
         }
         router.replace(router.asPath);
         return response.data;
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
      <Center>
         <Flex flexDirection={"column"}>
            <WritePost />

            {posts?.map((value: any) => {
               const {
                  Fullname,
                  Username,
                  ID,
                  Content,
                  Likes,
                  UserID,
                  Profile,
                  CreatedAt,
               } = value;

               return (
                  <>
                     <Card data-key={ID} margin={"5"} key={ID} w={size}>
                        <CardHeader>
                           <Flex>
                              <Flex
                                 flex="1"
                                 gap="4"
                                 alignItems="center"
                                 flexWrap="wrap"
                              >
                                 <Avatar
                                    name={Fullname}
                                    src={`${API_URL}/${Profile}`}
                                 />

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
                                       {moment(CreatedAt)
                                          .startOf("second")
                                          .fromNow()}
                                    </Text>
                                 </Box>
                              </Flex>
                              <DropdownMenu userid={UserID} postid={ID} />
                           </Flex>
                        </CardHeader>
                        <CardBody>
                           <Text>{Content}</Text>
                        </CardBody>
                        {/* <Image
                           objectFit="cover"
                           src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                           alt="Chakra UI"
                        /> */}

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
                              // flex="3"
                              variant="ghost"
                              onClick={(e: any) => {
                                 likePost(
                                    e.target.parentElement.parentElement.getAttribute(
                                       "data-key"
                                    )
                                 );
                              }}
                              leftIcon={<BiLike />}
                           >
                              Like {Likes}
                           </Button>
                           <AddComment postid={ID} />
                        </CardFooter>
                     </Card>
                     <Divider orientation="horizontal" />
                  </>
               );
            })}
         </Flex>
      </Center>
   );
};

export default PostCard;
