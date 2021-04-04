import Head from "next/head";

//importar Componentes
import Card from "../components/card";

export default function Home(props) {
  return (
    <div>
      <Head>
        <title>Instagram</title>
      </Head>
      <div>
        {props.data && props.data.map(photo=>(
          <Card photo={photo} />
        ))}
      </div>
    </div>
  );
}
