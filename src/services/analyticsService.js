import API from "./api";

export const getSummary = async () => {
  const res = await API.get("/analytics/summary");
  return res.data;
};

export const getTrend = async () => {
  const res = await API.get("/analytics/trend");
  return res.data;
};
