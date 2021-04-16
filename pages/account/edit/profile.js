import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

//Importar componentes
import Loading from "../../../components/Loading";
import Header from "../../../components/header";
import EditProfile from "../../../components/EditProfile";

const perfil = () => {
  //Almacenar token
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);
  const ahorita = Math.round(new Date().getTime() / 1000.0);

  //routing
  const router = useRouter();

  //verificar si el token ha expirado o está destruído
  if (token) {
    if (decoded.exp < ahorita) {
      localStorage.removeItem("token");
      router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
      return <Loading />;
    }
  } else {
    router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
    return <Loading />;
  }
  return (
    <>
      <Header />
      <EditProfile />
    </>
  );
};

export default perfil;
