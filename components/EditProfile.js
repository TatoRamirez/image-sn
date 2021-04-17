import { useState } from "react";
import { useRouter } from "next/router";
import { useMutation, useQuery, gql } from "@apollo/client";
import { useFormik } from "formik";
import * as Yup from "yup";
import jwt from "jsonwebtoken";
import Head from "next/head";
import Rodal from "rodal";
import { countries } from "../components/Paises";

const ACTUALIZAR_USUARIO = gql`
  mutation updateUser($input: UserInput) {
    updateUser(input: $input) {
      token
    }
  }
`;

const EditProfile = () => {
  /* Decodificar token */
  const token = localStorage.getItem("token");
  const decoded = jwt.decode(token);

  //Router
  const router = useRouter();

  //Mutation de GraphQL
  const [updateUser] = useMutation(ACTUALIZAR_USUARIO);

  //Llamando para abrir y cerrar modal
  const [showmodal, handleshowmodal] = useState(false);
  const show = () => {
    handleshowmodal(true);
  };
  const hide = () => {
    handleshowmodal(false);
  };

  //Logout
  const logOut = () => {
    localStorage.removeItem("token");
    router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
  };

  const [message, handleMessage] = useState({ msg: "", type: "" });

  const formik = useFormik({
    initialValues: {
      nombre: `${decoded.name ? decoded.name : ""}`,
      apellido: `${decoded.lastname ? decoded.lastname : ""}`,
      usuario: `${decoded.user ? decoded.user : ""}`,
      descripcion: `${decoded.userdesc ? decoded.userdesc : ""}`,
      correo: `${decoded.personalemail ? decoded.personalemail : ""}`,
      telefono: `${decoded.phone ? decoded.phone : ""}`,
      genero: `${decoded.genre ? decoded.genre : ""}`,
      nacionalidad: `${decoded.nationality ? decoded.nationality : ""}`,
      cumpleaños: `${
        decoded.birthdate
          ? new Date(
              decoded.birthdate.replace(/-/g, "/").replace(/T.+/, "")
            ).toLocaleDateString("sv-SE")
          : ""
      }`,
    },
    onSubmit: async (values, { setErrors }) => {
      handleMessage({
        msg: (
          <div
            className="spinner-grow spinner-grow-sm text-secondary"
            role="status"
          />
        ),
        type: "success",
      });
      const {
        nombre,
        apellido,
        usuario,
        descripcion,
        correo,
        telefono,
        genero,
        nacionalidad,
        cumpleaños,
      } = values;
      try {
        const { data } = await updateUser({
          variables: {
            input: {
              name: nombre,
              lastname: apellido,
              user: usuario,
              userdesc: descripcion,
              personalemail: correo,
              phone: telefono,
              genre: genero,
              nationality: nacionalidad,
              birthdate: cumpleaños,
            },
          },
        });
        //Refresca el token con los nuevos datos
        const { token } = data.updateUser;
        localStorage.setItem("token", token);
        handleMessage({
          msg: (
            <div
              className="spinner-grow spinner-grow-sm text-success"
              role="status"
            />
          ),
          type: "success",
        });
        setTimeout(() => {
          router.push(
            `${process.env.NEXT_PUBLIC_PATH_DIR}account/edit/profile`
          );
          setErrors({});
          handleMessage(null);
        }, 2000);
      } catch (error) {
        handleMessage({
          msg: error.message,
          type: "error",
        });
        setTimeout(() => {
          handleMessage(null);
        }, 2000);
      }
    },
  });

  const formikImage = useFormik({
    initialValues: {
      imagen: `${decoded.image ? decoded.image : "/default/user.png"}`,
    },
    onSubmit: async (values, { setErrors }) => {
      handleMessage({
        msg: (
          <div
            className="spinner-grow spinner-grow-sm text-secondary"
            role="status"
          />
        ),
        type: "success",
      });
      const { imagen } = values;
      try {
        const { data } = await updateUser({
          variables: {
            input: {
              image: imagen,
            },
          },
        });
        handleMessage({
          msg: (
            <div
              className="spinner-grow spinner-grow-sm text-success"
              role="status"
            />
          ),
          type: "success",
        });
        setTimeout(() => {
          logOut();
          setErrors({});
          handleMessage(null);
        }, 2000);
      } catch (error) {
        handleMessage({
          msg: error.message,
          type: "error",
        });
        setTimeout(() => {
          handleMessage(null);
        }, 2000);
      }
    },
  });

  const mostrarMensaje = () => {
    return (
      <div className="d-flex justify-content-center text-danger">
        <p>{message.msg}</p>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Editar perfil • Instagram</title>
      </Head>
      <Rodal visible={showmodal} onClose={hide}>
        <div className="rodalcontainer">
          <div className="row no-gutters">
            <div className="col-12 d-flex justify-content-center mt-4">
              <h3 className="h3-rodal">Cambiar foto del perfil</h3>
            </div>
            <div className="col-12 d-flex justify-content-center mt-5">
              <button className="botonmodal btnupload">Subir foto</button>
              <input type="file" className="input-upload botonmodal" />
            </div>
            <div className="col-12 d-flex justify-content-center">
              <button className="botonmodal" onClick={hide}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </Rodal>
      <div className="div-principal d-flex">
        <div className="col-lg-3 align-items-start sidebar-principal p-0">
          <a
            className="list-group-item list-group-item-action menu-pestaña active"
            href="/accounts/edit/"
          >
            Editar perfil
          </a>

          <a
            className="list-group-item list-group-item-action menu-pestaña"
            href=""
          >
            Cambiar contraseña
          </a>
        </div>

        <article className="col-12 col-lg-9">
          <form onSubmit={formikImage.handleSubmit}>
            <div className="row mt-4">
              <div className="col-12 col-lg-12 d-flex justify-content-center align-items-center">
                <div className="col-1 d-flex justify-content-center p-0">
                  <div className="div-foto-1">
                    <div className="div-foto-2">
                      <button
                        className="button-foto"
                        title="Cambiar foto del perfil"
                        onClick={show}
                      >
                        <img
                          alt="Cambiar foto del perfil"
                          className="button-img"
                          src={decoded.image}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-4">
                  <h1 className="div-usuario" title="t4toramir3z">
                    {decoded.user}
                  </h1>
                  <button
                    className="button-profile"
                    type="button"
                    onClick={show}
                  >
                    Cambiar foto del perfil
                  </button>
                </div>
              </div>
            </div>
          </form>

          <form className="mt-3" onSubmit={formik.handleSubmit}>
            <div className="row d-flex justify-content-start">
              <div className="col-12 mb-3">
                <div className="input-group">
                  <div className="label-campo">
                    <label htmlFor="nombre">Nombre</label>
                  </div>
                  <div className="col-6">
                    <input
                      placeholder="Nombre"
                      type="text"
                      id="nombre"
                      className="campo-editprofile"
                      value={formik.values.nombre}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="input-group">
                  <div className="label-campo">
                    <label htmlFor="apellido">Apellido</label>
                  </div>
                  <div className="col-6">
                    <input
                      placeholder="Apellido"
                      type="text"
                      id="apellido"
                      className="campo-editprofile"
                      value={formik.values.apellido}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="input-group">
                  <div className="label-campo">
                    <label htmlFor="usuario">Nombre de usuario</label>
                  </div>
                  <div className="col-6">
                    <input
                      placeholder="Nombre de usuario"
                      type="text"
                      id="usuario"
                      className="campo-editprofile"
                      value={formik.values.usuario}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="input-group">
                  <div className="label-campo">
                    <label htmlFor="descripcion">Presentación</label>
                  </div>
                  <div className="col-6">
                    <textarea
                      className="campo-editprofile"
                      id="descripcion"
                      style={{ height: 64 }}
                      value={formik.values.descripcion}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 d-flex justify-content-center mb-1">
                <div className="col-5">
                  <h2 className="h2-info">Información personal</h2>
                </div>
              </div>

              <div className="col-12">
                <div className="input-group">
                  <div className="label-campo">
                    <label htmlFor="correo">Correo electrónico</label>
                  </div>
                  <div className="col-6">
                    <input
                      placeholder="Correo electrónico"
                      type="text"
                      id="correo"
                      className="campo-editprofile"
                      value={formik.values.correo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="input-group">
                  <div className="label-campo">
                    <label htmlFor="telefono">Número de teléfono</label>
                  </div>
                  <div className="col-6">
                    <input
                      placeholder="Número de teléfono"
                      type="text"
                      id="telefono"
                      className="campo-editprofile"
                      value={formik.values.telefono}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="input-group">
                  <div className="label-campo">
                    <label htmlFor="genero">Género</label>
                  </div>
                  <div className="col-6">
                    <input
                      placeholder="Género"
                      type="text"
                      id="genero"
                      className="campo-editprofile"
                      value={formik.values.genero}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>

              <div className="col-12 mb-3">
                <div className="input-group">
                  <div className="label-campo">
                    <label htmlFor="nacionalidad">Nacionalidad</label>
                  </div>
                  <div className="col-6">
                    <select
                      id="nacionalidad"
                      className="campo-editprofile"
                      value={formik.values.nacionalidad}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    >
                      {countries.map((data) => {
                        return <option key={data.id}>{data.name}</option>;
                      })}
                    </select>
                  </div>
                </div>
              </div>

              <div className="col-12">
                <div className="input-group">
                  <div className="label-campo">
                    <label htmlFor="cumpleaños">Cumpleaños</label>
                  </div>
                  <div className="col-6">
                    <input
                      type="date"
                      id="cumpleaños"
                      className="campo-editprofile"
                      value={formik.values.cumpleaños}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="row d-flex justify-content-center m-4">
              <input type="submit" className="enviar-button" />
            </div>

            {message && message.msg && mostrarMensaje()}
          </form>
        </article>
      </div>
    </>
  );
};

export default EditProfile;
