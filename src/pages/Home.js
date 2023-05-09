import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import "../App.css";
import { AiOutlineUser } from "react-icons/ai";

function Home({ isAuth }) {
  const [postList, setPostList] = useState([]);

  const postCollectionRef = collection(db, "posts");

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postCollectionRef);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  });

  const deletePost = async (id) => {
    const deleteConfirm = window.confirm("Are you sure you want to delete ?");
    if (deleteConfirm) {
      const postDoc = doc(db, "posts", id);
      await deleteDoc(postDoc);
    }
  };

  return (
    <div className="blogsPage">
      <div className="homePage ">
        {postList.map((post) => {
          return (
            <div
              className="card text-center post"
              style={{ background: "#000000" }}
            >
              <img
                src={post.imageUrl}
                className="card-img-top h-20"
                alt={post.title}
              />
              <div className="card-body">
                <h4 className="card-title">{post.title}</h4>
                <p className="card-text" style={{ overflow: "scroll" }}>
                  {post.postText}
                </p>
              </div>
              <div className="deletePost ">
                {isAuth && post.author.id === auth.currentUser.uid && (
                  <button
                    className="delButton"
                    onClick={() => {
                      deletePost(post.id);
                    }}
                  >
                    &#128465;
                  </button>
                )}
              </div>
              <div className="card-footer">
                <small className="text-muted">
                  <AiOutlineUser />
                  <span className="p-2">{post.author.name}_</span>
                </small>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
