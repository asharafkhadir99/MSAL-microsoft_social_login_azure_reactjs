
import { Button, Layout } from "antd";
import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../authConfig";

function UnAuthorizedLayout() {
  const { instance } = useMsal();

  const handleLogin = (loginType) => {
    if (loginType === "redirect") {
      instance.loginRedirect(loginRequest).catch((e) => {
        console.log(e);
      });
    }
  };
  return (
    <Layout
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ marginBottom: "2rem" }}>You are Unauthorized</h1>
      <h1 style={{ marginBottom: "2rem" }}>Please login to your account</h1>
      <Button
        size="large"
        type="primary"
        onClick={() => handleLogin("redirect")}
        style={{ width: "300px", height: "75px", fontSize: "1.5rem" }}
      >
        Microsoft Login
      </Button>
    </Layout>
  );
}

export default UnAuthorizedLayout;
