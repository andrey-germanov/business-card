import { Link } from "react-router-dom";
import { Header, Text, Group, Button, Badge, Flex, Stack } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";
import { signOut, getAuth } from "firebase/auth";
import { useNavigate } from "react-router";
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';

interface IWrapperApp {
  children: React.ReactNode;
}

export function WrapperApp({ children }: IWrapperApp) {
  const navigate = useNavigate();
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [signOut, loadingSignOut, errorSignOut] = useSignOut(auth);

  const signControl = () => {
    if ( loading ) return <>loading</>
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
      <Header height={70} p="md">
        <Flex justify={"space-between"} align={"center"}>
          <Link to={"/"}>Logo</Link>
          <Text>Smart Links</Text>
          <Group>{signControl()}</Group>
        </Flex>
      </Header>
      <div style={{padding: '20px'}}>
        {children}
      </div>
    </Stack>
  );
}
