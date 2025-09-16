// src/utils/session.js
export async function checkSession() {
  try {
    const response = await fetch(
      "http://localhost/React/eevent/src/BackEnd/src/Auth/checkSession.php",
      {
        method: "GET",
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Session check failed:", err);
    return { loggedIn: false };
  }
}
