import React from "react";
import "./PostDetail.css";
import Post from "../../components/Post/Post.jsx";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Menu from "../../components/Menu/Menu.jsx";

const PostDetail = () => {
  const params = useParams();
  const { posts, loading } = useSelector((state) => state.postReducer);

  const post = posts.filter((obj) => {
    return obj._id === params.id;
  });

  return (
    <div className="PostDetail">
      <Menu />
      {loading
        ? "Fetching Posts..."
        : post.map((post, id) => {
            return <Post key={id} data={post} />;
          })}
    </div>
  );
};

export default PostDetail;
