import { Navigate } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  let token = localStorage.getItem("token");

  if (token) {
    return children;
  } else {
    return <Navigate to={"/login"} />;
  }
};

export default PrivateRouter;
