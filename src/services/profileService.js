import API from "./api";

export const setTrackingStart = async (date) => {
  const res = await API.post("/profile/tracking-start", { date });
  return res.data;
};
