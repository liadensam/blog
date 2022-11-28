import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./singlepost.css";
import { Context } from "../../context/Context";

export default function SinglePost() {
  const { user } = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const publicFolder = "http://localhost:5002/images/";

  const [post, setPost] = useState({});
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${post._id}`, {
        data: { username: user.username },
      });
      window.location.replace("/");
    } catch (err) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (err) {}
  };

  return (
    <div className="singlepost">
      <div className="singlepostWrapper">
        {post.photo && (
          <img
            src={publicFolder + post.photo}
            alt="single post image"
            className="singlepostImg"
          />
        )}
        {updateMode ? (
          <input
            type="text"
            value={title}
            className="singlepostTitleInput"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="singlepostTitle">
            {title}
            {post.username === user?.username && (
              <div className="singlepostEdit">
                <i
                  className="singlepostIcon fa-solid fa-pen"
                  onClick={() => setUpdateMode(true)}
                ></i>
                <i
                  className="singlepostIcon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
        )}

        <div className="singlepostInfo">
          <span className="singlepostAuthor">
            Author:
            <Link to={`/?user=${post.username}`} className="link">
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlepostDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        {updateMode ? (
          <textarea
            className="singlepostDescInput"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        ) : (
          <p className="singlepostDesc">{desc}</p>
        )}
        {updateMode && (
          <button className="singlepostButton" onClick={handleUpdate}>
            Update
          </button>
        )}
      </div>
    </div>
  );
}
