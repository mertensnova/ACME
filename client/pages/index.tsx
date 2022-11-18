import Head from "next/head";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { Layout } from "../components/Layout";
import { AcmeLogo } from "../components/Logo";

export default function Home() {
  return (
    <>
      <Head>
        <title>Social</title>
        <meta name="description" content="Made by Amr Ashebo" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar isBordered>
        <Navbar.Brand>
          <AcmeLogo />
          <Text b color="inherit" hideIn="xs">
            ACME
          </Text>
        </Navbar.Brand>
        <Navbar.Content hideIn="xs"></Navbar.Content>
        <Navbar.Content>
          <Navbar.Link color="inherit" href="#">
            Login
          </Navbar.Link>
          <Navbar.Item>
            <Button auto flat as={Link} href="#">
              Sign Up
            </Button>
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  );
}
