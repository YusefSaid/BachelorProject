import React from "react";
import { Route, Navigate } from "react-router-dom";
 
function ProtectedRoute({ path, element: Component }) {
  const token = localStorage.getItem("accessToken");
 
  return (
    <Route
      path={path}
      element={
        token ? (
          <Component />
        ) : (
          <Navigate to="//front-end/src/scenes/home/index.jsx" replace />
        )
      }
    />
  );
}
 
export default ProtectedRoute;
 