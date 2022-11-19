import Head from "next/head";
import { Navbar, Button, Link, Text } from "@nextui-org/react";
import { AcmeLogo } from "../components/icons/Logo";
import SignInModal from "../components/SignInModal";
import LoginModal from "../components/LoginModal";

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
          <LoginModal />

          <Navbar.Item>
            <SignInModal />
          </Navbar.Item>
        </Navbar.Content>
      </Navbar>
    </>
  );
}
