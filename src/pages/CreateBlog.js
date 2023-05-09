import React, { useState, useEffect } from "react";
import "../App.css";
import { addDoc, collection } from "firebase/firestore";
import { auth, db, storage } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { AiOutlineUpload } from "react-icons/ai";

function CreateBlog({ isAuth }) {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const postCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const createPost = async (e) => {
    e.preventDefault();

    const imageRef = ref(storage, `images/${uuidv4()}- ${imageUpload.name}`);
    await uploadBytes(imageRef, imageUpload);

    const imageUrl = await getDownloadURL(imageRef);

    await addDoc(postCollectionRef, {
      title,
      postText,
      imageUrl,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
    });
    navigate("/home");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="blogs mt-4">
        <form className="w-50 ">
          <div className="mb-3 p-5 w-100 text-center ">
            <label className="btn btn-dark btn-sm mt-3 p-2">
              <input
                type="file"
                id="file"
                className="form-control mb-5 w-100"
                onChange={(e) => setImageUpload(e.target.files[0])}
                style={{}}
              />
              <AiOutlineUpload /> Choose a Photo
            </label>

            <input
              type="text"
              className="form-control mb-5 w-100"
              placeholder="Title..."
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="form-control h-50"
              id="exampleFormControlTextarea1"
              rows="6"
              placeholder="Post...."
              onChange={(e) => setPostText(e.target.value)}
            ></textarea>
            <button
              type="button"
              className="btn btn-dark btn-sm mt-4 p-2"
              onClick={createPost}
            >
              Submit Post
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreateBlog;
