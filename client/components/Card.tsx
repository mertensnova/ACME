import { Card, Grid, Text, Container, Spacer, Button } from "@nextui-org/react";
import React from "react";

export default function PostCard() {
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
                <Text css={{ color: "$accents8" }}>nextui.org</Text>
              </Grid>
            </Grid.Container>
          </Card.Header>
          <Card.Body css={{ py: "$2" }}>
            <Text>
              Make beautiful websites regardless of your design experience.
            </Text>
          </Card.Body>
          <Card.Footer>
            <Button size="sm" color={"primary"} auto ghost>
              Like
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
