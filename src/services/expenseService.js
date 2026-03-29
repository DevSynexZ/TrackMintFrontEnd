import API from "./api";

export const addExpense = (data) => API.post("/expenses/add", data);
export const getExpenseHistory = () => API.get("/expenses/history");

export const resetAccount = async () => {
  const res = await API.post("/user/reset");
  return res.data;
};
