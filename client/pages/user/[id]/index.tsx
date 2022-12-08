import React from "react";
import { GetServerSideProps } from "next";
import { Button, Container, Grid, Spacer } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/url";
import NavBar from "../../../components/NavBar";
import PostCard from "../../../components/Card";
import ViewUser from "../../../components/ViewUser";

const User = ({ user }: any) => {
   const [kind, setKind] = useState("posts");
   return (
      <>
         <NavBar />
         <ViewUser user={user} />
         <Grid.Container gap={2} justify="center">
            <Grid>
               {kind == "posts" ? (
                  <>
                     <Button onClick={() => setKind("posts")}>Posts</Button>
                  </>
               ) : (
                  <Button flat onClick={() => setKind("posts")}>
                     Posts
                  </Button>
               )}
            </Grid>
            <Grid>
               {kind == "liked" ? (
                  <>
                     <Button onClick={() => setKind("liked")}>
                        Liked Posts
                     </Button>
                  </>
               ) : (
                  <Button flat onClick={() => setKind("liked")}>
                     Liked Posts
                  </Button>
               )}
            </Grid>
         </Grid.Container>
         <PostCard posts={user[kind]} />
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
   const res = await axios.get(`${API_URL}/user/${context.params.id}`);
   const user = await res.data;

   return {
      props: {
         user,
      },
   };
};

export default User;
