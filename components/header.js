import { useRouter } from "next/router";
import { useState } from "react";
import jwt from "jsonwebtoken";

const header = () => {
  /* Decodificar token */
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  //Router
  const router = useRouter();

  //Logout
  const logOut = () => {
    localStorage.removeItem("token");
    router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
  };

  const [showDropDown, setShow] = useState(false);

  let classDropDown = showDropDown ? "show " : "border-transparent";

  return (
    <nav className="navbar navbar-dark bg-white fixed-top nav-style">
      <div className="container-fluid justify-content-around d-flex">
        <a
          className="navbar-brand m-0 logo"
          href={`${process.env.NEXT_PUBLIC_PATH_DIR}`}
        >
          <img
            src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/Logo.png`}
            alt=""
            width="103"
            height="29"
            className="d-line-block align-top"
            loading="lazy"
          />
        </a>
        <div className="col-1">
          <div className="row">
            <div className="col-5">
              <button
                type="button"
                className={`header-icon`}
                onClick={() =>
                  router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`)
                }
              >
                {router.pathname === "/" ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/icons/house-door-fill.svg`}
                    alt="inHome"
                    height="24"
                    width="24"
                  />
                ) : (
                  <img
                    src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/icons/house-door.svg`}
                    alt="Home"
                    height="24"
                    width="24"
                  />
                )}
              </button>
            </div>
            <div className="col-5">
              <div className="dropdown">
                <button
                  type="button"
                  className="header-icon"
                  onFocus={() => setShow(true)}
                  onBlur={() =>
                    setTimeout(() => {
                      setShow(false);
                    }, 150)
                  }
                  /* onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_PATH_DIR}${decoded.user}`
                  )
                } */
                >
                  <div className={`user-select ${classDropDown}`}>
                    <img
                      src={decoded && decoded.image}
                      alt="Perfil"
                      height="24"
                      width="24"
                      className="rounded-circle"
                    />
                  </div>
                </button>
                <ul className={`dropdown-menu dd-menu p-0 ${classDropDown}`}>
                  <div className="dd-menu-punta "></div>
                  <li>
                    <a
                      className="dropdown-item p-1 pl-3 optselect"
                      href={`${process.env.NEXT_PUBLIC_PATH_DIR}${
                        decoded && decoded.user
                      }`}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/icons/person-circle.svg`}
                        alt="Perfil"
                        width="13"
                        className="mr-2"
                      />
                      Perfil
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item p-1 pl-3 optselect"
                      href={`${process.env.NEXT_PUBLIC_PATH_DIR}account/edit/profile`}
                    >
                      <img
                        src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/icons/gear-wide.svg`}
                        alt="Configuracion"
                        width="13"
                        className="mr-2"
                      />
                      Configuración
                    </a>
                  </li>

                  <hr className="dropdown-divider p-0 m-0" />

                  <li className="text-center">
                    <a
                      className="dropdown-item p-1 optselect"
                      href=""
                      onClick={logOut}
                    >
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default header;
