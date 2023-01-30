import { Link } from "react-router-dom";
import { Header, Text, Group, Button, Badge, Flex, Stack } from "@mantine/core";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Logo } from "./shared/Logo";

interface IWrapperApp {
  children: React.ReactNode;
}

export function AppLayout({ children }: IWrapperApp) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);

  const signControl = () => {
    if (loading) return <>loading</>;
    if (user) {
      return (
        <>
          <Badge variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
            {user.email}
          </Badge>
          <Button onClick={signOut}>log out</Button>
        </>
      );
    } else {
      return <Link to={"/login"}>login</Link>;
    }
  };
  return (
    <Stack style={{ height: "100%" }} spacing={0}>
      <Header
        style={{
          boxShadow: "rgba(0, 0, 0, 0.15) 0px 3px 15px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 0,
        }}
        height={70}
        p="md"
      >
        <Flex
          style={{ width: "100%" }}
          justify={"space-between"}
          align={"center"}
        >
          <Link style={{ color: "black" }} to={"/"}>
            <Flex align={"center"} justify={"center"} gap={10}>
              <Logo />
              <Text weight={300}>Smart Links</Text>
            </Flex>
          </Link>
          <Group>{signControl()}</Group>
        </Flex>
      </Header>
      <Flex
        justify={"center"}
        align={"center"}
        style={{
          padding: "20px",
          width: "100%",
        }}
      >
        {children}
      </Flex>
    </Stack>
  );
}
