import API from "./api";

export const addLend = (data) => API.post("/lend/add", data);
export const getLendHistory = () => API.get("/lend/history");
