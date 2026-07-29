import API from "./api";

export const createFeedback = async (data: any) => {
  const response = await API.post("/feedback", data);
  return response.data;
};

export const getFeedbacks = async () => {
  const response = await API.get("/feedback");
  return response.data;
};

export const deleteFeedback = async (id: string) => {
  const response = await API.delete(`/feedback/${id}`);
  return response.data;
};