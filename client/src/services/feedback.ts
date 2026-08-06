import API from "./api";

export const createFeedback = async (data: any) => {
  const { data: response } = await API.post("/feedback", data);
  return response;
};

export const getFeedbacks = async (dashboard = false) => {
  const { data } = await API.get(
    `/feedback${dashboard ? "?dashboard=true" : ""}`
  );

  return data;
};

export const deleteFeedback = async (id: string) => {
  const { data } = await API.delete(`/feedback/${id}`);
  return data;
};