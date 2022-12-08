import { Button, Container, Grid, Spacer } from "@nextui-org/react";
import { useState } from "react";
import { API_URL } from "../pages/api/url";
import UserCard from "./UserCard";

const ViewUser = ({ user }: any) => {
   return (
      <>
         <Spacer y={3} />
         <Container
            css={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <UserCard data={user} />
         </Container>
      </>
   );
};

export default ViewUser;
