import Head from "next/head";
import React from "react";
import Navigation from "../components/Navigation";
import UserProfileEdit from "../components/UserProfileEdit";

const EditProfile = () => {
   return (
      <>
         <Head>
            <title>ACME</title>
         </Head>
         <Navigation />;
         <UserProfileEdit />
      </>
   );
};

export default EditProfile;
