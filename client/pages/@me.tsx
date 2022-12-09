import React, { useState } from "react";
import {
   Card,
   Button,
   Input,
   Container,
   Spacer,
   Row,
   Avatar,
} from "@nextui-org/react";
import { API_URL } from "./api/url";
import { UserIcon } from "../components/icons/User";
import { updateUser } from "./api/auth";
import UserCircle from "../components/icons/UserCircle";
import { user } from "./api/auth";
import { useRouter } from "next/router";

const Profile = () => {
   const [username, setUsername] = useState("");
   const [fullname, setFullname] = useState("");
   const id = user?.ID;
   const router = useRouter();

   return (
      <>
         <Spacer y={5} />
         <Container
            css={{
               display: "flex",
               alignItems: "center",
               justifyContent: "center",
            }}
         >
            <form
               onSubmit={(e: any) => {
                  e.preventDefault();
                  updateUser({ username, fullname, id });
               }}
               action={`${API_URL}/@me`}
               method="POST"
               id="editform"
            >
               <Card
                  css={{
                     p: "$6",
                     mw: "900px",
                     h: "300px",
                     display: "flex",
                     alignItems: "center",
                     justifyContent: "space-around",
                  }}
               >
                  {/* <Avatar
                     src="https://i.pravatar.cc/150?u=a04258114e29026702d"
                     css={{ size: "$20" }}
                  /> */}
                  <Input
                     clearable
                     bordered
                     fullWidth
                     color="primary"
                     initialValue="NextUI"
                     size="lg"
                     type={"text"}
                     name="Username"
                     value={username}
                     placeholder="New Username"
                     onChange={(e) => setUsername(e.target.value)}
                     contentLeft={<UserIcon fill="currentColor" />}
                  />

                  <Input
                     clearable
                     bordered
                     fullWidth
                     color="primary"
                     size="lg"
                     type={"text"}
                     name="Fullname"
                     value={fullname}
                     placeholder="New Full Name"
                     onChange={(e) => setFullname(e.target.value)}
                     contentLeft={<UserCircle fill="currentColor" />}
                  />
                  <Row>
                     <Button
                        onClick={() => localStorage.removeItem("user")}
                        flat
                        type="submit"
                        form="editform"
                     >
                        Update
                     </Button>
                     <Spacer x={1} />
                     <Button
                        onClick={() => router.push("/dashboard")}
                        color={"error"}
                        flat
                     >
                        Back
                     </Button>
                  </Row>
               </Card>
            </form>
         </Container>
      </>
   );
};

export default Profile;
