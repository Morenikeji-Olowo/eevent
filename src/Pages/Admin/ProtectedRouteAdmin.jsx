import React, { useEffect, useState } from 'react'
import { Navigate } from "react-router-dom";
import { checkSessionAdmin } from '../../utils/session/checkSessionAdmin';

export default function ProtectedRouteAdmin({ children }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    async function verify() {
      const session = await checkSessionAdmin();
      setLoggedIn(session.loggedIn);
      setLoading(false);
    }
    verify();
  }, []);

  if (loading) return <p>Checking session...</p>;
  if (!loggedIn) return <Navigate to="/admin-login" />;

  return children;
}