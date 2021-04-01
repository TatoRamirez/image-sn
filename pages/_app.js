import { useLayoutEffect, useState } from "react";

//importar Componentes
import Header from "../components/header/header";

//importar CSS
import "bootstrap/dist/css/bootstrap.css";
import "../styles/global.css";
import "../styles/header.css";
import "../styles/card.css";

function MyApp({ Component, pageProps }) {
  const [photos, setPhotos] = useState([]);

  useLayoutEffect(() => {
    fetch("/mocks/items.json")
      .then((response) => response.json())
      .then((formatted) => setPhotos(formatted));
  }, []);

  return (
    <>
      <Header />
      <br/>
      <div className="menu-padding container-md mt-5 p-0">
        <Component data={photos} {...pageProps} />
      </div>
    </>
  );
}

export default MyApp;
