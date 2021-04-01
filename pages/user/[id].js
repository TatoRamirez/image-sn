import { useRouter } from "next/router";
import { useState } from "react";
import moment from "moment";

const UserPage = (props) => {
  //Router
  const router = useRouter();

  const id = router.query.id;
  const [bookmarked, setBookmarked] = useState(false);
  const userPhotos = props.data.filter(
    (item) => String(item.userId) === String(id)
  );

  if (props.data && props.data.length && !userPhotos) {
    router.push("/");
  }

  if (userPhotos.length) {
    return (
      <>
        <div className="row text-black">
          <div className="col-2">
            <img
              src={userPhotos[0].authorLogo}
              alt=""
              className="img-fluid rounded-circle border-primary"
            />
          </div>
          <div className="col-3 text-center d-flex flex-colum align-items-center">
          <p className="m-0">{userPhotos.length}</p>
            <p className="text-black-50">Posts</p>
          </div>
          <div className="col-3 text-center d-flex flex-colum align-items-center">
            <p className="m-0">{moment(userPhotos[0].createdAt).fromNow()}</p>
            <p className="text-black-50">Active</p>
          </div>
          <div className="col-3 text-center d-flex flex-colum align-items-center">
            <button
              type="button"
              className={`btn btn-dark p-0 text-left ${
                bookmarked ? "clicked" : ""
              }`}
              onClick={() => setBookmarked(true)}
            >
              Follow
            </button>
          </div>
        </div>
        <div className="text-black pt-4">
          <h3>{userPhotos[0].author}</h3>
          <p className="white-space-break">
            {userPhotos[0].authorDesc}
          </p>
        </div>
        <div className="p-5">
          <hr className="text-black" />
        </div>
        <div className="row row-cols-3">
          {userPhotos.map((photo) => (
            <img className="p-3" src={photo.photo} />
          ))}
        </div>
      </>
    );
  } else {
    return <p>Loading...</p>;
  }
};

export default UserPage;
