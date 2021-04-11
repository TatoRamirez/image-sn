import { React, useEffect, useState, useLayoutEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import clientDeft from "../config/apollo";

//importar CSS
import "bootstrap/dist/css/bootstrap.css";
import "rodal/lib/rodal.css";
import "../styles/global.css";
import "../styles/header.css";
import "../styles/card.css";
import "../styles/perfil.css";
import "../styles/Loading.css";
import "../styles/Error.css";
import "../styles/modal.css";
import "../styles/login.css";
import "../styles/signup.css";

function MyApp({ Component, pageProps }) {
  const [clt, handleclt] = useState(false);
  const [loading, handleLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      handleclt(true);
    } else {
      handleclt(false);
    }
    handleLoading(true);
  }, []);

  /* const [photos, setPhotos] = useState([]);

  useLayoutEffect(() => {
    fetch("/mocks/items.json")
      .then((response) => response.json())
      .then((formatted) => setPhotos(formatted));
  }, []); */

  return (
    <>
      {loading && (
        <ApolloProvider client={clientDeft}>
          <div className="menu-padding container-md mt-5 p-0">
            <Component {...clientDeft} />
          </div>
        </ApolloProvider>
      )}
      {/* <Header />
      <br />
      <div className="menu-padding container-md mt-5 p-0">
        <Component data={photos} {...pageProps} />
      </div> */}
    </>
  );
}

export default MyApp;
