const Error = () => {
  return (
    <div className="diverror-main">
      <h2 className="h2error">Esta página no está disponible.</h2>
      <div className="diverror">
        <div className="diverror2">
          Es posible que el enlace que seleccionaste esté roto o que se haya
          eliminado la página.{" "}
          <a href={`${process.env.NEXT_PUBLIC_PATH_DIR}`}>
            Volver a Instagram.
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;
