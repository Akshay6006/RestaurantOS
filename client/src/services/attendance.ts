import api from "@/lib/axios";

export const getAttendance = async () => {
  const response = await api.get("/attendance");
  return response.data;
};

export const createAttendance = async (data: any) => {
  const response = await api.post("/attendance", data);
  return response.data;
};