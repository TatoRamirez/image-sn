import Head from "next/head";

//importar Componentes
import Header from "../components/header";
import Card from "../components/card";

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Instagram</title>
      </Head>
      <Header />
      <br />
      <div>
        {props.data && props.data.map((photo) => <Card photo={photo} />)}
      </div>
    </div>
  );
}
