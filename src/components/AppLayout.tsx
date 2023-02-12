import { Link } from "react-router-dom";
import { Header, Text, Group, Button, Badge, Flex, Stack } from "@mantine/core";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import { Logo } from "./shared/Logo";
import { useStyles } from "./useStylesAppLayout";

interface IWrapperApp {
  children: React.ReactNode;
}

export function AppLayout({ children }: IWrapperApp) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const { classes } = useStyles();

  const showInfo = () => {
    if (loading) return <>loading</>;
    if (user) {
      return (
        <Link to={"/logout"}>
          <Badge variant="gradient" gradient={{ from: "indigo", to: "cyan" }}>
            {user.email}
          </Badge>
        </Link>
      );
    } else {
      return <Link to={"/login"}>login</Link>;
    }
  };
  return (
    <Stack style={{ height: "100%" }} spacing={0}>
      <Header
        className={classes.header}
        height={70}
        p="md"
        display={'flex'}
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
          <Group>{showInfo()}</Group>
        </Flex>
      </Header>
      <Flex
        justify={"center"}
        align={"center"}
        className={classes.children}
      >
        {children}
      </Flex>
    </Stack>
  );
}
