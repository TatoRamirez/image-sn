import React, { useState } from "react";
import { useFormik } from "formik";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import * as Yup from "yup";
import jwt from "jsonwebtoken";

const REGISTRO_USUARIO = gql`
  mutation newUser($input: UserInput) {
    newUser(input: $input) {
      token
    }
  }
`;

const SignUp = () => {
  //routing
  const router = useRouter();

  //Mutation de GraphQL
  const [newUser] = useMutation(REGISTRO_USUARIO);

  const [message, handleMessage] = useState({ msg: "", type: "" });

  const formik = useFormik({
    initialValues: {
      imagen: "/default/user.png",
      nombre: "",
      apellido: "",
      correo: "",
      usuario: "",
      contra: "",
    },
    validationSchema: Yup.object({
      nombre: Yup.string().required("Ingresa tu nombre"),
      apellido: Yup.string().required("Ingresa tu apellido"),
      usuario: Yup.string().required("Ingresa tu usuario"),
      correo: Yup.string()
        .email("Ingresa un correo válido")
        .required("Ingresa tu correo"),
      contra: Yup.string().required("Ingresa tu contraseña"),
    }),
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
      const { imagen, nombre, apellido, correo, usuario, contra } = values;
      try {
        const { data } = await newUser({
          variables: {
            input: {
              image: imagen,
              name: nombre,
              lastname: apellido,
              personalemail: correo,
              user: usuario,
              password: contra,
            },
          },
        });
        //Guardar token local y decodifica
        const { token } = data.newUser;
        localStorage.setItem("token", token);
        const decoded = jwt.decode(token);
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
          formik.resetForm();
          setErrors({});
          router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}${decoded.user}`);
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

  //States
  const [showInputName, setShowName] = useState(false);
  const [showInputLastname, setShowLastname] = useState(false);
  const [showInputEmail, setShowEmail] = useState(false);
  const [showInputUser, setShowUser] = useState(false);
  const [showInputPass, setShowPass] = useState(false);

  let classSpanName = showInputName ? "span-input-login-transform" : "";
  let classSpanLastname = showInputLastname ? "span-input-login-transform" : "";
  let classSpanEmail = showInputEmail ? "span-input-login-transform" : "";
  let classSpanUser = showInputUser ? "span-input-login-transform" : "";
  let classSpanPass = showInputPass ? "span-input-login-transform" : "";

  return (
    <article className="article-login">
      <div className="div-login-1">
        <div className="div-login-2">
          <h1 className="h1-login-logo">
            <img
              src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/Logo.png`}
              alt="Logo"
              width="175"
              height="51"
            />
          </h1>
          <div className="div-login-3">
            <form className="form-login" onSubmit={formik.handleSubmit}>
              <h2 className="h2-register">Regístrate</h2>
              <div className="div-login-4">
                <div className="div-input-login">
                  <div className="div-input-login-2">
                    <label className="label-input-login">
                      <span className={`span-input-login ${classSpanName}`}>
                        Nombre
                      </span>
                      <input
                        maxLength="75"
                        type="text"
                        id="nombre"
                        className="input-login"
                        value={formik.values.nombre}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={() => setShowName(true)}
                      />
                    </label>
                  </div>
                </div>

                <div className="div-input-login">
                  <div className="div-input-login-2">
                    <label className="label-input-login">
                      <span className={`span-input-login ${classSpanLastname}`}>
                        Apellido
                      </span>
                      <input
                        maxLength="75"
                        type="text"
                        id="apellido"
                        className="input-login"
                        value={formik.values.apellido}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={() => setShowLastname(true)}
                      />
                    </label>
                  </div>
                </div>

                <div className="div-input-login">
                  <div className="div-input-login-2">
                    <label className="label-input-login">
                      <span className={`span-input-login ${classSpanEmail}`}>
                        Correo
                      </span>
                      <input
                        maxLength="75"
                        type="text"
                        id="correo"
                        className="input-login"
                        value={formik.values.correo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={() => setShowEmail(true)}
                        autoComplete="mail"
                      />
                    </label>
                  </div>
                </div>

                <div className="div-input-login">
                  <div className="div-input-login-2">
                    <label className="label-input-login">
                      <span className={`span-input-login ${classSpanUser}`}>
                        Nombre de usuario
                      </span>
                      <input
                        maxLength="75"
                        type="text"
                        id="usuario"
                        className="input-login"
                        value={formik.values.usuario}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={() => setShowUser(true)}
                      />
                    </label>
                  </div>
                </div>

                <div className="div-input-login">
                  <div className="div-input-login-2">
                    <label className="label-input-login">
                      <span className={`span-input-login ${classSpanPass}`}>
                        Contraseña
                      </span>
                      <input
                        type="password"
                        id="contra"
                        className="input-login"
                        value={formik.values.contra}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        onKeyDown={() => setShowPass(true)}
                      />
                    </label>
                  </div>
                </div>

                <div className="div-button-login-iniciar mt-3">
                  <input
                    type="submit"
                    className="button-login-iniciar"
                    value="Registrarte"
                  />
                </div>
              </div>
              {message && message.msg && mostrarMensaje()}
              {formik.touched.nombre && formik.errors.nombre ? (
                <div className="d-flex justify-content-center text-danger">
                  {formik.errors.nombre}
                </div>
              ) : null}
              {formik.touched.apellido && formik.errors.apellido ? (
                <div className="d-flex justify-content-center text-danger">
                  {formik.errors.apellido}
                </div>
              ) : null}
              {formik.touched.correo && formik.errors.correo ? (
                <div className="d-flex justify-content-center text-danger">
                  {formik.errors.correo}
                </div>
              ) : null}
              {formik.touched.usuario && formik.errors.usuario ? (
                <div className="d-flex justify-content-center text-danger">
                  {formik.errors.usuario}
                </div>
              ) : null}
              {formik.touched.contra && formik.errors.contra ? (
                <div className="d-flex justify-content-center text-danger">
                  {formik.errors.contra}
                </div>
              ) : null}
              <p className="p-register">
                Al registrarte, aceptas nuestros{" "}
                <a href="#">términos y condiciones.</a>
              </p>
            </form>
          </div>
        </div>
        <div className="div-login-2">
          <div className="div-login-6">
            <p className="p-login">
              ¿Tienes una cuenta?{" "}
              <a
                href={`${process.env.NEXT_PUBLIC_PATH_DIR}`}
                tabIndex="0"
                className="a-register"
              >
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default SignUp;
