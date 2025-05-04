import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Loader from "./Loader";

const AppContainer = () => {
  const { user, isError, isPending, error } = useAuth();

  if (isError) console.log(error?.message);

  return isPending ? (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Loader />
    </div>
  ) : user ? (
    <Outlet /> // OR maybe MainLayout.tsx should be here?
  ) : (
    <Navigate
      to="/login"
      replace
      state={{
        redirectUrl: window.location.pathname,
      }}
    />
  );
};

export default AppContainer;
