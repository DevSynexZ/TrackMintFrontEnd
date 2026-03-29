import API from "./api";

export const addBorrow = (data) => API.post("/borrow/add", data);
export const getBorrowHistory = () => API.get("/borrow/history");
