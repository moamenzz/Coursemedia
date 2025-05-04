import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/apiRoutes";

const useAuth = () => {
  const {
    data: user,
    isError,
    error,
    isPending,
  } = useQuery({
    queryKey: ["auth"],
    queryFn: getUser,
  });

  return {
    user: user ?? null,
    isError,
    error,
    isPending,
  };
};
export default useAuth;
