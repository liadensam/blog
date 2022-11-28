import { Link } from "react-router-dom";
import "./post.css";

export default function Post({ post }) {
  const publicFolder = "http://localhost:5000/images/";

  return (
    <div className="post">
      {post.photo && (
        <img className="postImg" src={publicFolder + post.photo} alt="post image" />
      )}
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((cat) => (
            <span className="postCat">{cat.name}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="link">
          <span className="postTitle">{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">
          {new Date(post.createdAt).toDateString()}
        </span>
      </div>
      <p className="postDesc">{post.desc}</p>
    </div>
  );
}
