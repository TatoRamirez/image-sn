import { useState } from "react";
import Link from "next/link";
import moment from "moment";

const card = (props) => {
  const [photo, setPhoto] = useState(props.photo);

  return (
    <div className="card text-black bg-white mb-5">
      <div className="card-header">
        <div className="row">
          <div className="col-12 p-0 pl-2 font-weight-bold">
            <a href={`/user/${photo.userId}`}>
              <img
                src={photo.authorLogo}
                alt=""
                width="32"
                height="32"
                className="img-fluid rounded-circle border-primary"
              />
            </a>
            <a
              href={`/user/${photo.userId}`}
              className="align-middle ml-3 username"
            >
              {photo.author}
            </a>
          </div>
        </div>
      </div>
      <img src={photo.photo} alt="" className="card-img-top" />
      <div className="card-body pt-2">
        <div className="row justify-content-between">
          <div className="col-1 d-flex justify-content-start">
            <span className="corazon-span">
              <button
                type="button"
                className={`corazon-button ${photo.liked ? "corazon-red" : ""}`}
                onClick={() => {
                  if (!photo.liked) {
                    setPhoto({ ...photo, liked: true, likes: photo.likes + 1 });
                  } else {
                    setPhoto({
                      ...photo,
                      liked: false,
                      likes: photo.likes - 1,
                    });
                  }
                }}
              >
                {photo.liked ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    className="bi bi-heart-fill"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                    />
                  </svg>
                ) : (
                  <img
                    src="images/icons/heart.svg"
                    alt="Me gusta"
                    height="24"
                    width="24"
                  />
                )}
              </button>
            </span>
          </div>

          <div className="col-1 d-flex justify-content-end">
            <span className="bookmark-span">
              <button
                className="bookmark-button"
                type="button"
                onClick={() => {
                  if (!photo.bookmarked) {
                    setPhoto({ ...photo, bookmarked: true });
                  } else {
                    setPhoto({ ...photo, bookmarked: false });
                  }
                }}
              >
                {photo.bookmarked ? (
                  <img
                    src="images/icons/bookmark-fill.svg"
                    alt="No guardar"
                    height="24"
                    width="24"
                  />
                ) : (
                  <img
                    src="images/icons/bookmark.svg"
                    alt="Guardar"
                    height="24"
                    width="24"
                  />
                )}
              </button>
            </span>
          </div>
        </div>
        <p className="card-title font-weight-bold">{photo.likes} Me gusta</p>
        <p className="card-title font-weight-bolder">
          <a className="username" href={`/user/${photo.userId}`}>
            {photo.author}
          </a>
          {/* <span className="font-weight-normal"> {photo.location}</span> */}
        </p>
        <p className="card-text">{photo.description}</p>
        <p className="card-text tags">{photo.tags}</p>
        <p className="card-text">
          <small className="text-muted">
            {moment(photo.CreatedAt).fromNow()}
          </small>
        </p>
      </div>
    </div>
  );
};

export default card;
