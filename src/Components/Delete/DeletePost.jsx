import React from "react";
import { toast } from "react-toastify";

const DeletePost = ({ postId }) => {
  const handleDelete = async () => {
    try {
      const res = await fetch(
        "http://localhost/React/Eevent/src/BackEnd/src/Delete/DeletePost.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ postId }), // must match PHP
        }
      );

      const data = await res.json();
      console.log(data);

      if (data.success) {
        toast.success("Post deleted!");
        window.location.reload();
        // Optionally refresh posts here
      } else {
        toast.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return <button onClick={handleDelete}>Delete</button>;
};

export default DeletePost;
