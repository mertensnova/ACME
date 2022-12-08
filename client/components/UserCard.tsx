import React from "react";
import { Card, Button, Text, Spacer, Avatar } from "@nextui-org/react";

const UserCard = ({ data }: any) => {
   return (
      <Card
         css={{
            w: "45%",
            h: "350px",
            display: "flex",
            alignItems: "center",
         }}
      >
         <Spacer y={2} />
         <Card.Body css={{ p: 0 }}>
            <Avatar src="/profile.jpg" css={{ size: "$20" }} />
            <Spacer y={1} />
            <Text size={"$3xl"}>Amr Ashebo</Text>
            <Text color="#d1d1d1" size={"xl"}>
               @username
            </Text>
            <Spacer y={1} />
         </Card.Body>
      </Card>
   );
};

export default UserCard;
