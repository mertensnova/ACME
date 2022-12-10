import React from "react";
import { GetServerSideProps } from "next";
import { useState } from "react";
import axios from "axios";
import { API_URL } from "../../api/url";
import PostCard from "../../../components/PostCard";
import ProfileCard from "../../../components/ProfileCard";
import Navigation from "../../../components/Navigation";

const User = ({ user }: any) => {
   const [kind, setKind] = useState("posts");

   return (
      <>
         <Navigation />
         <ProfileCard data={user} />
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
