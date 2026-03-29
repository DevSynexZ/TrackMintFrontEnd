import API from "./api";

export const addBalance = async (data) => {
  const res = await API.post("/balance/add", data);
  return res.data;
};
