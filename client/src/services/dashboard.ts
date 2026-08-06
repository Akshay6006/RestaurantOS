import API from "./api";

export const getDashboardStats = async () => {
  const { data } = await API.get("/dashboard/stats");
  return data;
};

export const generateDashboardReport = async () => {
  const response = await API.get("/dashboard/report", {
    responseType: "blob",
  });

  return response.data;
};