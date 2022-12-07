import { Button, Container, Grid, Spacer } from "@nextui-org/react";
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
            <Grid.Container gap={2} justify="center">
               <Grid>
                  <Button flat>Posts</Button>
               </Grid>
               <Grid>
                  <Button flat>Liked Posts</Button>
               </Grid>
            </Grid.Container>
         </Container>
      </>
   );
};

export default ViewUser;
