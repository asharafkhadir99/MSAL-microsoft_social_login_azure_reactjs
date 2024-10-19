import React, { useState } from "react";

import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import UnAuthorizedLayout from "./components/UnAuthorizedLayout";
import AuthorizedLayout from "./components/AuthorizedLayout";

function App() {
  return (
    <>
      <UnauthenticatedTemplate>
        <UnAuthorizedLayout />
      </UnauthenticatedTemplate>
      <AuthenticatedTemplate>
        <AuthorizedLayout />
      </AuthenticatedTemplate>
    </>
  );
}

export default App;
