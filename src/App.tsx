import React, { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Helmet } from "react-helmet";
import Router from "./routes/Router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Xnet Shop</title>
        <link rel="canonical" href="http://mysite.com/example" />
      </Helmet>
      <BrowserRouter>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
