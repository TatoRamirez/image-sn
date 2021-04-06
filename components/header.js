import { useRouter } from "next/router";
import { useState } from "react";
import jwt from "jsonwebtoken";

const header = () => {
  /* Decodificar token */
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  //Router
  const router = useRouter();

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
              <button
                type="button"
                className={`header-icon`}
                onClick={() =>
                  router.push(
                    `${process.env.NEXT_PUBLIC_PATH_DIR}${decoded.user}`
                  )
                }
              >
                <img
                  src={decoded.image}
                  alt="Perfil"
                  height="24"
                  width="24"
                  className="rounded-circle border-primary"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default header;
