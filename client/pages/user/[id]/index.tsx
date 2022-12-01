import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { API_URL } from "../../api/url";
import NavBar from "../../../components/NavBar";
import UserCard from "../../../components/UserCard";
import PostCard from "../../../components/Card";

const User = ({ user }: any) => {
   return (
      <>
         <NavBar />
         <UserCard user={user} />
         <PostCard posts={user} />
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
