import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation, useQuery, gql } from "@apollo/client";
import moment from "moment";

//importar Componentes
import Loading from "../../components/Loading";

const VER_POSTUSUARIO = gql`
  query verPostUsuario {
    allUserPost {
      id
      iduser
      image
      description
      likes
      createdate
      modifieddate
    }
  }
`;

const UserPage = () => {
  //Leer info de la base
  const { loading, error, data } = useQuery(VER_POSTUSUARIO);

  //Router
  const router = useRouter();

  /* const id = router.query.id; */
  const [bookmarked, setBookmarked] = useState(false);
  /*   const userPhotos = props.data.filter(
    (item) => String(item.userId) === String(id)
  ); */

  /*  if (props.data && props.data.length && !userPhotos) {
    router.push("/");
  } */

  return (
    <>
      <div className="row text-black">
        <div className="col-3 d-flex justify-content-center">
          <img
            src="" /* {data.image} */ /* {userPhotos[0].authorLogo} */
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
                {/* {userPhotos[0].author} */}
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
                  {/* {userPhotos.length} */}
                </span>{" "}
                Publicaciones
              </span>
            </div>
          </div>
          <div className="row d-flex justify-content-start mt-3">
            <div className="col-12 d-flex align-items-center">
              <p>{/* {userPhotos[0].authorDesc} */}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5">
        <hr className="text-black" />
      </div>
      <div className="row row-cols-3">
        {/* {userPhotos.map((photo) => (
            <img className="foto-espacio photoinfo" src={photo.photo} />
          ))} */}
      </div>
    </>
  );
};

export default UserPage;
