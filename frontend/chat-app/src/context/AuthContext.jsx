// import { createContext } from "react";

// // Create Auth Context
// export const AuthContext = createContext();

// // Auth Provider
// export const AuthProvider = ({ children }) => {

// };


import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../api/auth/AuthApi";

// Create Auth Context
export const AuthContext = createContext();

// Auth Provider
export const AuthProvider = ({ children }) => {
  // Store the currently logged-in user
  const [user, setUser] = useState(null);

  // Track whether we are checking authentication
  const [authLoading, setAuthLoading] = useState(true);

  // Get current user when application starts
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await getCurrentUser();

        // Store current user
        setUser(res.data.user);
      } catch (error) {
        // No authenticated user
        setUser(null);
      } finally {
        // Authentication check is complete
        setAuthLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        authLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};