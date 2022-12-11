import React from "react";
import { GetServerSideProps } from "next";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/url";
import PostCard from "../../../components/PostCard";
import ProfileCard from "../../../components/ProfileCard";
import Navigation from "../../../components/Navigation";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";

const User = ({ user }: any) => {
   console.log(user);

   return (
      <>
         <Navigation />
         <ProfileCard data={user} />
         <Tabs isFitted variant="enclosed" colorScheme="blue">
            <TabList>
               <Tab>Posts</Tab>
               <Tab>Likes</Tab>
            </TabList>
            <TabPanels>
               <TabPanel>
                  <PostCard posts={user["posts"]} />
               </TabPanel>
               <TabPanel>
                  <PostCard posts={user["liked"]} />
               </TabPanel>
            </TabPanels>
         </Tabs>
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
