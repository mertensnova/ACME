import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import { API_URL } from "../../api/url";
import NavBar from "../../../components/NavBar";
import PostCard from "../../../components/Card";
import ViewUser from "../../../components/ViewUser";

const User = ({ user }: any) => {
   console.log(user);

   return (
      <>
         <NavBar />
         <ViewUser user={user} />
         {/* <PostCard posts={user} /> */}
      </>
   );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
   const res = await axios.get(`${API_URL}/user/${context.params.id}`);
   const user = await res.data;
   console.log(user);

   return {
      props: {
         user,
      },
   };
};

export default User;
