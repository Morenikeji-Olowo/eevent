import React, { useEffect, useState } from 'react'
import { checkSession } from '../utils/session/checkSession';
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function verify() {
      const session = await checkSession();
      setLoggedIn(session.loggedIn);
      setLoading(false);
    }
    verify();
  }, []);

  if (loading) return <p>Checking session...</p>;
  if (!loggedIn) return <Navigate to="/authenticate" />;

  return children;
}