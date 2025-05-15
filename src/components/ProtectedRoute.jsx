import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/SupabaseClient";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null while checking

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
    };

    checkSession();
  }, []);

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // Optional: add a spinner or skeleton
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
