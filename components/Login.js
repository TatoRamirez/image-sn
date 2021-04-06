import { useState } from "react";

const Login = () => {
  const [showInputUser, setShowUser] = useState(false);
  const [showInputPass, setShowPass] = useState(false);

  let classSpanUser = showInputUser ? "span-input-login-transform" : "";
  let classSpanPass = showInputPass ? "span-input-login-transform" : "";

  return (
    <article className="article-login">
      <div className="div-login-1">
        <div className="div-login-2">
          <h1 className="h1-login-logo">Instagram</h1>
          <div className="div-login-3">
            <form className="form-login" id="loginForm">
              <div className="div-login-4">
                <div className="div-input-login">
                  <div className="div-input-login-2">
                    <label className="label-input-login">
                      <span className={`span-input-login ${classSpanUser}`}>
                        Teléfono, usuario o correo electrónico
                      </span>
                      <input
                        maxlength="75"
                        name="username"
                        type="text"
                        id="inputUser"
                        className="input-login"
                        onChange={() => setShowUser(true)}
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
                        name="password"
                        type="password"
                        className="input-login"
                        onChange={() => setShowPass(true)}
                      />
                    </label>
                  </div>
                </div>
                <div className="div-button-login-iniciar mt-3">
                  <input
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
