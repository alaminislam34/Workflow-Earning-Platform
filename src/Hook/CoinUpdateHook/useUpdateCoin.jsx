import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../../Axios/useAxiosSecure";

const useUpdateCoin = () => {
  const mutation = useMutation({
    mutationFn: async ({ email, newCoin }) => {
      const res = await axiosInstance.patch(`/coinModify`, { email, newCoin });
      return res.data;
    },
  });
  return mutation;
};

export default useUpdateCoin;
