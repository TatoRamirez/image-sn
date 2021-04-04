
const header = () => {
  return (
    <nav className="navbar navbar-dark bg-white fixed-top nav-style">
      <div className="container-fluid justify-content-center d-flex">
        <a className="navbar-brand m-0 logo" href={`${process.env.NEXT_PUBLIC_PATH_DIR}`}>
          <img
            src={`${process.env.NEXT_PUBLIC_PATH_DIR}images/Logo.png`}
            alt=""
            width="103"
            height="29"
            className="d-line-block align-top"
            loading="lazy"
          />
        </a>
      </div>
    </nav>
  );
};

export default header;
