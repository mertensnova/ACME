import React from "react";
import { Card, Text, Spacer, Avatar } from "@nextui-org/react";

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
            <Text size={"$3xl"}>{data?.posts[0]?.Fullname}</Text>
            <Text color="#d1d1d1" size={"xl"}>
               @{data?.posts[0]?.Username}
            </Text>
            <Spacer y={1} />
         </Card.Body>
      </Card>
   );
};

export default UserCard;
