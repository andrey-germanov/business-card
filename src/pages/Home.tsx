import { Link } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import { Flex } from "@mantine/core";

export const Home = () => {
  return (
    <AppLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Welcome</h1>
        <Flex
          justify={"center"}
          align={"center"}
          style={{
            borderRadius: "20px",
            background: "#228be6",
            fontSize: "30px",
          }}
        >
          <Link
            style={{
              color: "white",
              padding: "30px",
            }}
            to="/builder-card"
          >
            Get started
          </Link>
        </Flex>
      </div>
    </AppLayout>
  );
};
