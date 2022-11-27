import {
  Card,
  Grid,
  Text,
  Container,
  Spacer,
  Button,
  Loading,
} from "@nextui-org/react";
import React from "react";
import ViewPost from "./ViewPost";
import { getAllPosts } from "../pages/api/post";
import { useQuery } from "react-query";
import axios from "axios";
import { API_URL } from "../pages/api/url";

export default function PostCard() {
  let read = false;
  let user;

  const { data, isLoading, isError } = useQuery("posts", getAllPosts);
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user") ?? "");
  } else {
    console.log("You are on the server");
  }

  // console.log(data);

  if (isLoading) {
    return (
      <Container fluid display="flex" alignItems="center" justify="center">
        <Loading />
      </Container>
    );
  }

  const truncateString = (str: any, num: any) => {
    if (str?.length > num) {
      let subStr = str.substring(0, num);
      read = true;
      return subStr;
    } else {
      return str;
    }
  };

  return (
    <>
      {data?.map((value: any, index: any) => {
        const { fullname, username } = value;
        return (
          <>
            {value?.Posts.map((e: any) => {
              const { ID, content, userid, like } = e;
              return (
                <>
                  <Spacer y={2} />
                  <Container
                    display="flex"
                    alignItems="center"
                    justify="center"
                    xl={true}
                  >
                    <Card key={ID} css={{ p: "$6", mw: "400px" }}>
                      <Card.Header>
                        <img
                          alt="nextui logo"
                          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                          width="34px"
                          height="34px"
                        />
                        <Grid.Container css={{ pl: "$6" }}>
                          <Grid xs={12}>
                            <Text h4 css={{ lineHeight: "$xs" }}>
                              {fullname}
                            </Text>
                          </Grid>
                          <Grid xs={12}>
                            <Text css={{ color: "$accents8" }}>
                              @{username}
                            </Text>
                          </Grid>
                        </Grid.Container>
                      </Card.Header>

                      <Card.Body css={{ py: "$2" }}>
                        <Text>{truncateString(content, 220)}</Text>
                        {read ? <ViewPost /> : ""}
                      </Card.Body>
                      <Card.Footer>
                        <Button size="sm" color={"primary"} auto ghost>
                          Like {1}
                        </Button>
                        <Spacer x={1} />
                        <Button size="sm" color={"success"} auto ghost>
                          Comment
                        </Button>
                      </Card.Footer>
                    </Card>
                  </Container>
                </>
              );
            })}
          </>
        );
      })}
    </>
  );
}
