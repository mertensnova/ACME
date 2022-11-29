import { Card, Grid, Text, Container, Spacer, Button } from "@nextui-org/react";
import React from "react";
import ViewPost from "./ViewPost";
import Image from "next/image";
import { user } from "../pages/api/auth";

export default function PostCard({ posts }: any) {
   let read = false;

   const truncateString = (str: any, num: any) => {
      if (str?.length > num) {
         let subStr = str.substring(0, num);
         read = true;
         return subStr;
      } else {
         return str;
      }
   };

   return (
      <>
         {posts?.map((value: any, index: any) => {
            const { fullname, username } = value;
            return (
               <>
                  {value?.Posts.map((e: any) => {
                     const { ID, content, userid, like } = e;
                     return (
                        <>
                           <Spacer y={2} />
                           <Container
                              display="flex"
                              alignItems="center"
                              justify="center"
                              xl={true}
                           >
                              <Card key={ID} css={{ p: "$6", mw: "400px" }}>
                                 <Card.Header>
                                    <Image
                                       alt="nextui logo"
                                       src="/profile.jpg"
                                       width={34}
                                       height={34}
                                    />
                                    <Grid.Container css={{ pl: "$6" }}>
                                       <Grid xs={12}>
                                          <Text h4 css={{ lineHeight: "$xs" }}>
                                             {fullname}
                                          </Text>
                                       </Grid>
                                       <Grid xs={12}>
                                          <Text css={{ color: "$accents8" }}>
                                             @{username}
                                          </Text>
                                       </Grid>
                                    </Grid.Container>
                                 </Card.Header>

                                 <Card.Body css={{ py: "$2" }}>
                                    <Text>{truncateString(content, 220)}</Text>
                                    {read ? <ViewPost /> : ""}
                                 </Card.Body>
                                 <Card.Footer>
                                    <Button
                                       size="sm"
                                       color={"primary"}
                                       auto
                                       ghost
                                    >
                                       Like {1}
                                    </Button>
                                    <Spacer x={1} />
                                    <Button
                                       size="sm"
                                       color={"success"}
                                       auto
                                       ghost
                                    >
                                       Comment
                                    </Button>
                                 </Card.Footer>
                              </Card>
                           </Container>
                        </>
                     );
                  })}
               </>
            );
         })}
      </>
   );
}
