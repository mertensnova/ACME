import { Navbar, Text, Avatar, Dropdown, Input } from "@nextui-org/react";
import axios from "axios";
import { Layout } from "../components/Layout";
import { AcmeLogo } from "../components/Logo";
import { SearchIcon } from "../components/SearchIcon";
import { API_URL } from "./api/url";

export default function Dashboard() {
  let user;
  if (typeof window !== "undefined") {
    user = JSON.parse(localStorage.getItem("user"));
  } else {
    console.log("You are on the server");
  }
  const { email } = user;
  const logout = async () => {
    try {
      const resp = await axios.get(`${API_URL}/logout`);
      localStorage.removeItem("user");
      return resp;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={logout} action={`${API_URL}/logout`} method="GET">
        <Navbar isBordered variant="sticky">
          <Navbar.Brand css={{ mr: "$4" }}>
            <AcmeLogo />
            <Text b color="inherit" css={{ mr: "$11" }} hideIn="xs">
              ACME
            </Text>
          </Navbar.Brand>
          <Navbar.Content
            css={{
              "@xsMax": {
                w: "100%",
                jc: "space-between",
              },
            }}
          >
            <Navbar.Item
              css={{
                "@xsMax": {
                  w: "100%",
                  jc: "center",
                },
              }}
            >
              <Input
                clearable
                contentLeft={
                  <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
                }
                contentLeftStyling={false}
                css={{
                  w: "100%",
                  "@xsMax": {
                    mw: "300px",
                  },
                  "& .nextui-input-content--left": {
                    h: "100%",
                    ml: "$4",
                    dflex: "center",
                  },
                }}
                placeholder="Search..."
              />
            </Navbar.Item>
            <Dropdown placement="bottom-right">
              <Navbar.Item>
                <Dropdown.Trigger>
                  <Avatar
                    bordered
                    as="button"
                    color="primary"
                    size="md"
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                </Dropdown.Trigger>
              </Navbar.Item>
              <Dropdown.Menu
                aria-label="User menu actions"
                color="primary"
                onAction={(actionKey) => console.log({ actionKey })}
              >
                <Dropdown.Item key="profile" css={{ height: "$18" }}>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    Signed in as
                  </Text>
                  <Text b color="inherit" css={{ d: "flex" }}>
                    {email}
                  </Text>
                </Dropdown.Item>
                <Dropdown.Item key="settings" withDivider>
                  Change Theme
                </Dropdown.Item>
                <Dropdown.Item key="edit">Edit Profile</Dropdown.Item>

                <Dropdown.Item
                  // onClick={logout}
                  key="logout"
                  withDivider
                  color="error"
                >
                  Log Out
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Navbar.Content>
        </Navbar>
      </form>
    </>
  );
}
