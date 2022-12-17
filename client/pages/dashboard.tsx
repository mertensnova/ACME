import axios from "axios";
import { GetServerSideProps } from "next";
import { API_URL } from "./api/url";
import Navigation from "../components/Navigation";
import PostCard from "../components/PostCard";
import Head from "next/head";

export default function Dashboard({ posts }: any) {
   return (
      <>
         {" "}
         <Head>
            <title>ACME</title>
         </Head>
         <Navigation />
         <PostCard posts={posts} />
      </>
   );
}

export const getServerSideProps: GetServerSideProps = async (context: any) => {
   const res = await axios.get(`${API_URL}/dashboard`, {
      withCredentials: true,
   });

   const posts = res.data;

   return {
      props: {
         posts: JSON.parse(JSON.stringify(posts)),
      },
   };
};
