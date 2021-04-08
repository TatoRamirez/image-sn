import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

//importar Componentes
import Header from "../components/header";
import Perfil from "../components/profile";
import Loading from "../components/Loading";

const Profile = () => {
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
      return <Loading/>;
    }
  } else {
    router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
    return <Loading/>;
  }

  return (
    <>
      <Header />
      <br />
      <Perfil />
    </>
  );
};

export default Profile;
