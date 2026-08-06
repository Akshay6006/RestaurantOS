import API from "./api";

export const getAIInsights = async () => {
  const { data } = await API.get("/ai");
  return data;
};