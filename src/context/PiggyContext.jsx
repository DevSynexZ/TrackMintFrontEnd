import React, { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";
// import { getSummary } from "../services/analyticsService";
import { getTrend, getSummary } from "../services/analyticsService";

import { setTrackingStart } from "../services/profileService";

export const PiggyContext = createContext();

export function PiggyProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null,
  );
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState(null);
  const [globalRefresh, setGlobalRefresh] = useState(0);
  // AUTH HEADER
  useEffect(() => {
    if (token) {
      localStorage.setItem("authToken", token);
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("authToken");
      delete API.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // SAVE USER
  useEffect(() => {
    if (currentUser)
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    else localStorage.removeItem("currentUser");
  }, [currentUser]);

  const logout = () => {
    setCurrentUser(null);
    setToken(null);
    setSummary(null);
  };

  // 🔥 FETCH SUMMARY FROM BACKEND
  const fetchSummary = async () => {
    try {
      const res = await getSummary();
      setSummary(res.categories || {});
    } catch (err) {
      console.error("Summary fetch failed", err);
    }
  };

  const fetchTrend = async () => {
    try {
      const res = await getTrend();
      setTrend(res.data?.trend || res.trend || []);
    } catch (err) {
      console.error("Trend fetch failed", err);
    }
  };

  // 🔥 REFRESH USER
  const refreshUser = async () => {
    try {
      const profileRes = await API.get("/auth/profile");

      let expenses = [];
      try {
        const historyRes = await API.get("/expenses/history");
        expenses = historyRes.data?.history || [];
      } catch (err) {
        if (err.response?.status !== 404) throw err;
      }

      const userData = profileRes.data.data;

      const user = {
        ...userData,
        expenses,
        trackingStart: userData.trackingStart || null,
      };

      setCurrentUser(user);

      if (user.trackingStart) {
        await fetchSummary();
        await fetchTrend(); //later
      }
    } catch (err) {
      console.error("User refresh failed:", err);
    }
  };

  // 🔥 SET TRACKING DATE
  const setTrackingDate = async (date) => {
    if (currentUser?.trackingStart) return;

    try {
      await setTrackingStart(date); // correct API
      await refreshUser();
      await fetchSummary();
      await fetchTrend();
    } catch (err) {
      console.error("Tracking date failed", err);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      setLoading(true);
      await refreshUser();
      setLoading(false);
    };
    loadUser();
  }, [token]);

  return (
    <PiggyContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        token,
        setToken,
        refreshUser,
        logout,
        loading,
        summary,
        trend,
        fetchSummary,
        fetchTrend,
        setTrackingDate,
        globalRefresh,
        setGlobalRefresh,
      }}
    >
      {children}
    </PiggyContext.Provider>
  );
}

export const usePiggy = () => useContext(PiggyContext);
