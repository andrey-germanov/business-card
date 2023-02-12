import React from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSignOut } from "react-firebase-hooks/auth";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { Flex } from "@mantine/core";
import { useNavigate } from "react-router";

export const LogoutPage = () => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const navigate = useNavigate();

  const signControl = () => {
    if (loading) return <>loading</>;
    if (user) {
      return (
        <Flex direction={"column"} gap={24} p={24}>
          <Button
            style={{ width: "100px" }}
            variant="subtle"
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
          You are in the account {user.email}. <br /> You want logout?
          <Button style={{ width: "100px" }} onClick={signOut}>
            log out
          </Button>
        </Flex>
      );
    } else {
      return <Link to={"/login"}>login</Link>;
    }
  };
  return <div>{signControl()}</div>;
};
