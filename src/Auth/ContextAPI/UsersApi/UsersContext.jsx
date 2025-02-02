import { createContext, useMemo, useState } from "react";
import axiosInstance from "../../../Axios/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

export const userContext = createContext();
// eslint-disable-next-line react/prop-types
const UsersContext = ({ children }) => {
  const [search, setSearch] = useState("");
  const {
    data = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosInstance.get("/allUsers?name");
      return res.data;
    },
  });

  const totalCoins = useMemo(() => {
    return data.reduce((sum, user) => sum + (user.coins || 0), 0);
  }, [data]);

  const info = { data, isLoading, refetch, totalCoins, search, setSearch };
  return <userContext.Provider value={info}>{children}</userContext.Provider>;
};

export default UsersContext;
