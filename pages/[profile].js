import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";

//importar Componentes
import Loading from "../components/Loading";

const VER_USUARIO_AND_POSTUSUARIO = gql`
  query verPostUsuario($input: UserInput) {
    allUserPost {
      id
      iduser
      posts {
        id
        image
        description
        likes
        createdate
        modifieddate
      }
    }
    getUser(input: $input) {
      id
      user
      image
      name
      lastname
      userdesc
    }
  }
`;

const Profile = () => {
  //Router
  const router = useRouter();

  const profile = router.query.profile;

  //Leer info de la base
  const { loading, error, data } = useQuery(
    VER_USUARIO_AND_POSTUSUARIO,
    {
      variables: {
        input: {
          user: profile,
        },
      },
    }
  );

  const [bookmarked, setBookmarked] = useState(false);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="noti-contenedor animate__animated animate__headShake mt-5">
        <div className={`noti-error noti-popup`}>
          <h2 className="noti-titulo">Error!</h2>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="row text-black">
        <div className="col-3 d-flex justify-content-center">
          <img
            src={data && data.getUser && data.getUser.image}
            alt="Perfil"
            height="150"
            width="150"
            className="rounded-circle border-primary"
          />
        </div>
        <div className="col-9">
          <div className="row d-flex justify-content-start">
            <div className="col-6 col-lg-4 d-flex align-items-center">
              <h3 className="font-weight-normal">
                {data && data.getUser && data.getUser.user}
              </h3>
            </div>
            <div className="col-6 col-lg-2 d-flex align-items-center">
              {setBookmarked ? (
                <button
                  className="followbutton"
                  onClick={() => setBookmarked(true)}
                >
                  Seguir
                </button>
              ) : (
                <button
                  className="unfollowbutton"
                  onClick={() => setBookmarked(true)}
                >
                  <div className="unfollowicon">
                    <img
                      src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/icons/person-check-fill.svg`}
                      alt="Siguiendo"
                      width="24"
                    />
                  </div>
                </button>
              )}
            </div>
          </div>
          <div className="row d-flex justify-content-center mt-2">
            <div className="col-12 d-flex align-items-center">
              <span>
                <span className="font-weight-bolder">
                  {data &&
                    data.allUserPost[0] &&
                    data.allUserPost[0].posts &&
                    data.allUserPost[0].posts.length}
                </span>{" "}
                Publicaciones
              </span>
            </div>
          </div>
          <div className="row d-flex justify-content-start mt-3">
            <div className="col-12 d-flex align-items-center">
              <p>{data && data.getUser && data.getUser.userdesc}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-4">
        <hr className="text-black" />
      </div>
      <div className="row row-cols-3">
        {data &&
          data.allUserPost[0] &&
          data.allUserPost[0].posts &&
          data.allUserPost[0].posts.map((item) => (
            <img
              className="foto-espacio photoinfo"
              src={item.image}
              key={item.id}
            />
          ))}
      </div>
    </>
  );
};

export default Profile;
