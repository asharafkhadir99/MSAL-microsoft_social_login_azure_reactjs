import React from "react";
import { Layout, Button } from "antd";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../authConfig";
import { callMsGraph } from "../graph";

function AuthorizedLayout() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  function RequestProfileData() {
    instance
      .acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      })
      .then((response) => {
        callMsGraph(response.accessToken).then((response) =>
          setGraphData(response)
        );
      });
  }
  const handleLogout = (logoutType) => {
    if (logoutType === "redirect") {
      instance.logoutRedirect({
        postLogoutRedirectUri: "/",
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
      <h1 style={{ marginBottom: "2rem" }}>You are Authorized</h1>
      <h1 style={{ marginBottom: "2rem" }}>Welcome {accounts[0].name}</h1>
      <Button
        size="large"
        type="primary"
        onClick={RequestProfileData}
        style={{
          width: "300px",
          height: "75px",
          fontSize: "1.5rem",
          margin: "2rem",
        }}
      >
        View Profile Details
      </Button>
      {graphData && (
        <>
          <h1>Name : {graphData?.givenName}</h1>
          <h1>ID : {graphData?.id}</h1>
        </>
      )}
      <Button
        size="large"
        onClick={() => handleLogout("redirect")}
        style={{
          width: "300px",
          height: "75px",
          fontSize: "1.5rem",
          backgroundColor: "red",
          margin: "2rem",
        }}
      >
        Logout
      </Button>
    </Layout>
  );
}

export default AuthorizedLayout;
