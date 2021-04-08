import jwt from "jsonwebtoken";
import Head from "next/head";
import Login from "../components/Login";

//importar Componentes
import Header from "../components/header";
import Card from "../components/card";

export default function Home() {
  //Almacenar token
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);
  const ahorita = Math.round(new Date().getTime() / 1000.0);

  return (
    <div>
      <Head>
        <title>Instagram</title>
      </Head>
      {token ? (
        decoded.exp < ahorita ? (
          <>
            {localStorage.removeItem("token")}
            <Login />
          </>
        ) : (
          <Header />
        )
      ) : (
        <Login />
      )}
    </div>
  );
}
