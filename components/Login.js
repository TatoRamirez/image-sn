import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

const AUTENTICAR_USUARIO = gql`
  mutation authUser($input: AuthUserInput) {
    authUser(input: $input) {
      token
    }
  }
`;

const Login = () => {
  //routing
  const router = useRouter();

  //State
  const [message, handleMessage] = useState({ msg: "", type: "" });

  //Mutation
  const [authUser] = useMutation(AUTENTICAR_USUARIO);

  //Logout
  const logOut = () => {
    localStorage.removeItem("token");
    router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
  };

  const [showInputUser, setShowUser] = useState(false);
  const [showInputPass, setShowPass] = useState(false);

  let classSpanUser = showInputUser ? "span-input-login-transform" : "";
  let classSpanPass = showInputPass ? "span-input-login-transform" : "";

  const formik = useFormik({
    initialValues: {
      mail: "",
      pass: "",
    },
    validationSchema: Yup.object({
      mail: Yup.string().required("Ingresa un correo o usuario."),
      pass: Yup.string().required("Ingresa la contraseña."),
    }),
    onSubmit: async (values) => {
      const { mail, pass } = values;

      try {
        const { data } = await authUser({
          variables: {
            input: {
              personalemail: mail,
              password: pass,
            },
          },
        });

        handleMessage({
          msg: (
            <div
              class="spinner-grow spinner-grow-sm text-secondary"
              role="status"
            />
          ),
          type: "success",
        });

        //Guardar token local
        const { token } = data.authUser;
        localStorage.setItem("token", token);

        setTimeout(() => {
          handleMessage(null);
          router.push(`${process.env.NEXT_PUBLIC_PATH_DIR}`);
        }, 1000);

        //Redirigir
      } catch (error) {
        handleMessage({
          msg: error.message,
          type: "error",
        });

        setTimeout(() => {
          handleMessage(null);
        }, 3000);
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
              <div className="div-login-4">
                <div className="div-input-login">
                  <div className="div-input-login-2">
                    <label className="label-input-login">
                      <span className={`span-input-login ${classSpanUser}`}>
                        Correo o Usuario
                      </span>
                      <input
                        maxlength="75"
                        type="text"
                        id="mail"
                        className="input-login"
                        value={formik.values.mail}
                        onKeyDown={() => setShowUser(true)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        autoComplete="mail"
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
                        id="pass"
                        className="input-login"
                        value={formik.values.pass}
                        onKeyDown={() => setShowPass(true)}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </label>
                  </div>
                </div>

                <div className="div-button-login-iniciar mt-3">
                  <input
                    type="submit"
                    className="button-login-iniciar"
                    value="Iniciar sesión"
                  />
                </div>
                <div className="row div-login-5 d-flex justify-content-center mt-3">
                  <div className="col-5 div-login-raya"></div>
                  <div className="col div-login-O">o</div>
                  <div className="col-5 div-login-raya"></div>
                </div>
              </div>
              {message && message.msg && mostrarMensaje()}
              {formik.touched.mail &&
              formik.errors.mail &&
              formik.touched.pass &&
              formik.errors.pass ? (
                <div className="d-flex justify-content-center text-center text-danger">
                  <p>
                    {formik.errors.mail}
                    <br />
                    {formik.errors.pass}
                  </p>
                </div>
              ) : formik.touched.mail && formik.errors.mail ? (
                <div className="d-flex justify-content-center text-danger">
                  <p>{formik.errors.mail}</p>
                </div>
              ) : formik.touched.pass && formik.errors.pass ? (
                <div className="d-flex justify-content-center text-danger">
                  <p>{formik.errors.pass}</p>
                </div>
              ) : null}
              <a className="a-fogetpass" href="#" tabindex="0">
                ¿Olvidaste tu contraseña?
              </a>
            </form>
          </div>
        </div>
        <div className="div-login-2">
          <div className="div-login-6">
            <p className="p-login">
              ¿No tienes una cuenta?{" "}
              <a href="#" tabindex="0" className="a-register">
                Regístrate
              </a>
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Login;
