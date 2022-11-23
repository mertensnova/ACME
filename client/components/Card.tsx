import { Card, Grid, Text, Container, Spacer, Button } from "@nextui-org/react";
import React from "react";
import Like from "./icons/Like";
import ViewPost from "./ViewPost";

export default function PostCard() {
  let read = false;
  const text =
    ` Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
  eiusmod tempor incididunt ut labore et dolore magna aliqua. Purus
  gravida quis blandit turpis. Augue neque gravida in fermentum et
  sollicitudin ac orci. Et sollicitudin ac orci phasellus egestas.
  Elementum tempus egestas sed sed risus pretium quam vulputate.
  Interdum velit euismod in pellentesque massa placerat duis
  ultricies.` ?? "";
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
      <Spacer y={2} />
      <Container display="flex" alignItems="center" justify="center" xl={true}>
        <Card css={{ p: "$6", mw: "400px" }}>
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
                  Next UI
                </Text>
              </Grid>
              <Grid xs={12}>
                <Text css={{ color: "$accents8" }}>@nextui.org</Text>
              </Grid>
            </Grid.Container>
          </Card.Header>
          <Card.Body css={{ py: "$2" }}>
            <Text>{truncateString(text, 220)}</Text>
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
}
