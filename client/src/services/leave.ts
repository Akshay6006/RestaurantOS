import api from "@/lib/axios";

export const getLeaves = async () => {
  const response = await api.get("/leaves");
  return response.data;
};

export const createLeave = async (data: any) => {
  const response = await api.post("/leaves", data);
  return response.data;
};

export const updateLeaveStatus = async (
  id: string,
  status: string
) => {
  const response = await api.put(`/leaves/${id}`, {
    status,
  });

  return response.data;
};

export const deleteLeave = async (id: string) => {
  const response = await api.delete(`/leaves/${id}`);
  return response.data;
};