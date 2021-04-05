import { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import Head from "next/head";

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
  }
`;

const profile = () => {
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

  const [bookmarked, setBookmarked] = useState(false);

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
            <title>{`${data && data.getUser && data.getUser.name} ${
              data && data.getUser && data.getUser.lastname
            } (@${data && data.getUser && data.getUser.user})`}</title>
          </Head>
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
                    <span className="font-weight-bolder">
                      {data && data.getUser && data.getUser.name}
                    </span>{" "}
                    <span className="font-weight-bolder">
                      {data && data.getUser && data.getUser.lastname}
                    </span>
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
