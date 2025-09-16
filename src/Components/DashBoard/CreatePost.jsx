import React, { useState } from "react";
import { faCamera, faPaperPlane, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/CreatePost.css";

const CreatePost = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [postData, setPostData] = useState({ caption: "", image: null });

  // --- Handlers ---
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setPostData({ ...postData, image: file });
    }
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setPostData({ ...postData, image: null });
  };

const handlePostSubmit = async () => {
  try {
    const formData = new FormData();
    formData.append("caption", postData.caption);
    if (postData.image) formData.append("image", postData.image);

    const response = await fetch(
      "http://localhost/React/Eevent/src/BackEnd/src/Post/addNormalPost.php",
      {
        method: "POST",
        body: formData,
        credentials: "include", // for session cookies
      }
    );

    const result = await response.json();

    if (result.success) {
  toast.success("Post created successfully!");
  setPostData({ caption: "", image: null });
  setImagePreview(null);
} else {
  // Check for validation errors
  if (result.errors) {
    // PHP sends an object like { caption: "Caption is required" }
    const messages = Object.values(result.errors).join(", ");
    toast.error(messages);
  } else {
    toast.error(result.message || "Failed to create post");
  }
}

  } catch (error) {
    console.error("Error creating post:", error);
    toast.error("An unexpected error occurred");
  }
};


  return (
    <>
      <div className="header-text">
        <h2>Create a New Post</h2>
      </div>

      <div className="post-create-container">
        {/* Image Upload Section */}
        <div className="image-upload-section">
          <div className="upload-icon-wrapper">
            <label htmlFor="imageUpload" className="upload-icon">
              <FontAwesomeIcon icon={faCamera} size="lg" /> 
              <p>Upload Image</p>
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </div>

          {imagePreview && (
            <div className="image-preview">
              <img src={imagePreview} alt="Preview" />
            </div>
          )}
        </div>

        {/* Caption & Actions */}
        <div className="caption-section">
          <textarea
            name="caption"
            placeholder="Write your caption..."
            value={postData.caption}
            onChange={(e) =>
              setPostData({ ...postData, caption: e.target.value })
            }
          />

          <button className="post-button" onClick={handlePostSubmit}>
            <FontAwesomeIcon icon={faPaperPlane} /> Post
          </button>

          {imagePreview && (
            <div
              className="remove-image"
              onClick={handleRemoveImage}
              style={{ cursor: "pointer", color: "red", marginTop: "5px" }}
            >
              <FontAwesomeIcon icon={faTrash} /> Remove Image
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatePost;
