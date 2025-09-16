// utils/fetchDetailsOfUser.js
import { toast } from "react-toastify"; // make sure you installed react-toastify
import "react-toastify/dist/ReactToastify.css";

// utils/fetchDetailsOfUser.js
export async function fetchDetailsOfUser() {
  try {
    const res = await fetch(
      "http://localhost/React/eevent/src/BackEnd/src/ProgressData/getuserData.php",
      {
        method: "GET",
        credentials: "include", // keeps PHP session cookie
      }
    );

    return await res.json(); // always return parsed JSON
  } catch (err) {
    console.error("Error fetching user details:", err);
    throw err;
  }
}

