import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import "../../styles/HighLight.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddHighlight = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/HighLight/addHighLight.php",
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        toast.success("Highlight added!");
        window.location.reload();
        setShowOverlay(false);
        setTitle("");
        setImage(null);
        setPreview(null);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error("Error adding highlight:", err);
    }
  };

  return (
    <>
      <div className="add-btn">
        <button onClick={() => setShowOverlay(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>

      {showOverlay && (
        <div className="highlight-container" onClick={() => setShowOverlay(false)}>
          <div className="overlay" onClick={(e) => e.stopPropagation()}>
            <h2>Add Highlight</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="short text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />

              {preview && (
                <div className="preview-container">
                  <img src={preview} alt="Preview" className="preview-img" />
                </div>
              )}

              <button type="submit">Add</button>
              <button type="button" onClick={() => setShowOverlay(false)}>
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddHighlight;
