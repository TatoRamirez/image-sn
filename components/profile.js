import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, gql } from "@apollo/client";
import jwt from "jsonwebtoken";
import Head from "next/head";
import Rodal from "rodal";

//importar Componentes
import Loading from "../components/Loading";
import Error from "../components/Error";

const VER_USUARIO_AND_POSTUSUARIO = gql`
  query verPostUsuario($input: UserInput) {
    getUser(input: $input) {
      id
      user
      image
      name
      lastname
      userdesc
    }
    allUserPost(input: $input) {
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
    allUserFollows(input: $input) {
      iduser
      follows {
        follow_iduser
      }
    }
    allUserFollowers(input: $input) {
      iduser
      followers {
        follower_iduser
      }
    }
    getMyFollowers {
      follows {
        follow_iduser
      }
    }
  }
`;

const DAR_FOLLOW = gql`
  mutation newFollow($input: FollowsInput) {
    newFollow(input: $input)
  }
`;

const QUITAR_FOLLOW = gql`
  mutation deleteFollow($input: FollowsInput) {
    deleteFollow(input: $input)
  }
`;

const profile = () => {
  /* Decodificar token */
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  //Router
  const router = useRouter();

  const profile = router.query.profile;

  //Leer info de la base
  const { loading, error, data } = useQuery(VER_USUARIO_AND_POSTUSUARIO, {
    variables: {
      input: {
        user: profile,
      },
    },
  });

  const [newFollow] = useMutation(DAR_FOLLOW);

  const [deleteFollow] = useMutation(QUITAR_FOLLOW);

  let idusuario = data && data.getUser && data.getUser.id;
  let usuario = data && data.getUser && data.getUser.user;
  let nombre = data && data.getUser && data.getUser.name;
  let apellido = data && data.getUser && data.getUser.lastname;

  const isFollow =
    data &&
    data.getMyFollowers[0] &&
    data.getMyFollowers[0].follows &&
    data.getMyFollowers[0].follows.filter(
      (item) => item.follow_iduser === idusuario
    );

  //Función para dar follow al usuario
  const DarFollow = async (data) => {
    try {
      const {} = await newFollow({
        variables: {
          input: {
            iduser: data,
          },
        },
      });
      location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //Función para dar quitar follow al usuario
  const QuitarFollow = async (data) => {
    try {
      const {} = await deleteFollow({
        variables: {
          input: {
            iduser: data,
          },
        },
      });
      location.reload();
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  //Llamando para abrir y cerrar modal
  const [showmodal, handleshowmodal] = useState(false);
  const show = () => {
    handleshowmodal(true);
  };
  const hide = () => {
    handleshowmodal(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <>
      {data && data.getUser !== null ? (
        <>
          <Head>
            <title>{`${nombre} ${apellido} (@${usuario})`}</title>
          </Head>
          <Rodal visible={showmodal} onClose={hide}>
            <div className="rodalcontainer">
              <div className="row no-gutters">
                <div className="col-12 d-flex justify-content-center mt-6 mb-1">
                  <img
                    src={data && data.getUser && data.getUser.image}
                    alt="Perfil"
                    height="90"
                    width="90"
                    className="rounded-circle"
                  />
                </div>
                <div className="col-12 d-flex justify-content-center mt-4 FS14">
                  <span>¿Dejar de seguir a @{usuario}?</span>
                </div>
                <div className="col-12 d-flex justify-content-center mt-4">
                  <button className="botonmodal btnunfollow" onClick={() => QuitarFollow(idusuario)}>Dejar de seguir</button>
                </div>
                <div className="col-12 d-flex justify-content-center">
                  <button className="botonmodal" onClick={hide}>Cancelar</button>
                </div>
              </div>
            </div>
          </Rodal>
          <div className="row text-black">
            <div className="col-3 d-flex justify-content-center">
              <img
                src={data && data.getUser && data.getUser.image}
                alt="Perfil"
                height="150"
                width="150"
                className="rounded-circle"
              />
            </div>
            <div className="col-9">
              <div className="row d-flex justify-content-start">
                <div className="col-6 col-lg-4 d-flex align-items-center">
                  <h3 className="font-weight-light">{usuario}</h3>
                </div>
                <div className="col-6 col-lg-2 d-flex align-items-center">
                  {idusuario === decoded.id ? (
                    <a className="unfollowbutton" href={`${process.env.NEXT_PUBLIC_PATH_DIR}account/edit/profile`}>
                      <div className="unfollowicon">
                        <span>
                          <span>Editar Perfil</span>{" "}
                          <img
                            src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/icons/gear-wide.svg`}
                            alt="Editar Perfil"
                            width="13"
                            className="mt-n1"
                          />
                        </span>
                      </div>
                    </a>
                  ) : isFollow && isFollow.length === 1 ? (
                    <button className="unfollowbutton" onClick={show}>
                      <div className="unfollowicon">
                        <img
                          src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/icons/person-check-fill.svg`}
                          alt="Siguiendo"
                          width="24"
                        />
                      </div>
                    </button>
                  ) : (
                    <button
                      className="followbutton"
                      onClick={() => DarFollow(idusuario)}
                    >
                      Seguir
                    </button>
                  )}
                </div>
              </div>
              <div className="row d-flex justify-content-start mt-2">
                <div className="col-2 d-flex">
                  <span>
                    <span className="font-weight-bolder">
                      {data && data.allUserPost.length === 0
                        ? "0"
                        : data &&
                          data.allUserPost[0] &&
                          data.allUserPost[0].posts &&
                          data.allUserPost[0].posts.length}
                    </span>{" "}
                    Publicaciones
                  </span>
                </div>
                <div className="col-2 d-flex">
                  <span>
                    <span className="font-weight-bolder">
                      {data &&
                      data.allUserFollowers &&
                      data.allUserFollowers.length === 0
                        ? "0"
                        : data &&
                          data.allUserFollowers[0] &&
                          data.allUserFollowers[0].followers &&
                          data.allUserFollowers[0].followers.length}
                    </span>{" "}
                    Seguidores
                  </span>
                </div>
                <div className="col-2 d-flex">
                  <span>
                    <span className="font-weight-bolder">
                      {data &&
                      data.allUserFollows &&
                      data.allUserFollows.length === 0
                        ? "0"
                        : data &&
                          data.allUserFollows[0] &&
                          data.allUserFollows[0].follows &&
                          data.allUserFollows[0].follows.length}
                    </span>{" "}
                    Seguidos
                  </span>
                </div>
              </div>
              <div className="row d-flex justify-content-center mt-3">
                <div className="col-12 d-flex align-items-center">
                  <span>
                    <span className="font-weight-bolder">{nombre}</span>{" "}
                    <span className="font-weight-bolder">{apellido}</span>
                  </span>
                </div>
              </div>
              <div className="row d-flex justify-content-start">
                <div className="col-12 d-flex align-items-center">
                  <p>{data && data.getUser && data.getUser.userdesc}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <hr className="text-black" />
          </div>
          {data &&
          data.allUserPost[0] &&
          data.allUserPost[0].posts.length !== undefined ? (
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
          ) : (
            <div className="diverror-main">
              <div className="diverror2 pb-4">Aún no hay publicaciones</div>
            </div>
          )}
        </>
      ) : (
        <Error />
      )}
    </>
  );
};

export default profile;
