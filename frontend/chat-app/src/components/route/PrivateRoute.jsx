// import { Navigate, Outlet } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const PrivateRoute = () => {
//   const [loading, setLoading] = useState(true);
//   const [authenticated, setAuthenticated] = useState(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         await axios.get(`${import.meta.env.VITE_API_URL}/auth/me`, {
//           withCredentials: true,
//         });

//         setAuthenticated(true);
//       } catch (error) {
//         setAuthenticated(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   if (loading) {
//     return <div className="text-center">Loading...</div>;
//   }

//   return authenticated ? <Outlet /> : <Navigate to="/auth?mode=login" replace />;
// };

// export default PrivateRoute;




import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const PrivateRoute = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/auth/me`,
          {
            withCredentials: true,
          }
        );

        setUser(res.data?.user || null);
      } catch (error) {
        console.error("Authentication check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/auth?mode=login" replace />;
  }

  // Admin trying to access user-only route
  if (user.role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  // Normal user
  return <Outlet />;
};

export default PrivateRoute;
