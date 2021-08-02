import { Navigate, Route } from "react-router-dom";

export const PrivateRouter = ({ redirectPath, condition, ...props }) => {
  if (redirectPath === props.path) {
    throw new Error(
      "Redirected path is equal to specified path, this can cause a lot of rerenders"
    );
  }
  if (!condition) {
    return <Navigate to={redirectPath} />;
  }
  return <Route {...props} />;
};
