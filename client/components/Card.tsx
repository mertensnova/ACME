import {
   Card,
   Grid,
   Text,
   Container,
   Spacer,
   Button,
   Avatar,
} from "@nextui-org/react";
import React from "react";
import ViewPost from "./ViewPost";
import { API_URL } from "../pages/api/url";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import { HeartIcon } from "./icons/Heart";
import { user } from "../pages/api/auth";
import CardDropdownMenu from "./CardDropdownMenu.";

export default function PostCard({ posts }: any) {
   let read = false;
   const router = useRouter();

   const truncateString = (str: any, num: any) => {
      if (str?.length > num) {
         let subStr = str.substring(0, num);
         read = true;
         return subStr;
      } else {
         return str;
      }
   };

   const likePost = async ({ userId, postId }: any) => {
      const notify = () =>
         toast.success("Post liked", {
            theme: "dark",
         });
      try {
         // console.log(postId, userId);

         const response = await axios.post(
            `${API_URL}/like-post`,
            { userId, postId },
            { withCredentials: true }
         );
         notify();
         router.replace(router.asPath);

         return response.data;
      } catch (error) {
         console.log(error);
      }
   };

   return (
      <>
         {posts?.map((value: any) => {
            const { Fullname, Username, Profile, ID, Content, Likes, UserID } =
               value;
            // console.log(UserID,ID);

            return (
               <>
                  <Spacer y={2} />

                  {/* <Button
                     icon={<UserIcon fill="currentColor" />}
                     color="error"
                     flat
                  >
                     Delete User
                  </Button> */}
                  <Container
                     display="flex"
                     alignItems="center"
                     justify="center"
                     xl={true}
                  >
                     <Card
                        data-key={ID}
                        key={ID}
                        css={{ p: "$6", mw: "400px" }}
                     >
                        <Card.Header>
                           <Avatar
                              size={"lg"}
                              color="gradient"
                              rounded
                              alt="nextui logo"
                              src={`/profile.jpg`}
                              // src={`${API_URL}/${image}`}
                              width={34}
                              height={34}
                           />

                           <Grid.Container css={{ pl: "$6" }}>
                              <Grid xs={12}>
                                 <Text h4 css={{ lineHeight: "$xs" }}>
                                    {Fullname}
                                 </Text>
                              </Grid>
                              <Grid xs={12}>
                                 <Text css={{ color: "$accents8" }}>
                                    @{Username}
                                 </Text>
                              </Grid>
                           </Grid.Container>
                        </Card.Header>

                        <Card.Body css={{ py: "$2" }}>
                           <Text>{truncateString(Content, 220)}</Text>
                           {read ? <ViewPost /> : ""}
                        </Card.Body>
                        <Card.Footer>
                           <Button
                              auto
                              color="error"
                              onClick={() => likePost({ UserID, ID })}
                              icon={<HeartIcon fill="currentColor" filled />}
                           >
                              {Likes}
                           </Button>

                           <Spacer x={1} />
                           <CardDropdownMenu userID={UserID} />
                        </Card.Footer>
                     </Card>
                  </Container>
               </>
            );
         })}
      </>
   );
}
