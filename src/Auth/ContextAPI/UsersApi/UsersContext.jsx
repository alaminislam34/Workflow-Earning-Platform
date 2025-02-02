import { createContext, useMemo, useState } from "react";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export const userContext = createContext();
// eslint-disable-next-line react/prop-types
const UsersContext = ({ children }) => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");

  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", name, role],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/allUsers?name=${name}&role=${role}`
      );
      return res.data;
    },
    enabled: Boolean(name || role),
  });

  const totalCoins = useMemo(() => {
    return data.reduce((sum, user) => sum + (user.coins || 0), 0);
  }, [data]);

  const info = { data, isLoading, refetch, totalCoins, setName, setRole };
  return <userContext.Provider value={info}>{children}</userContext.Provider>;
};

export default UsersContext;
