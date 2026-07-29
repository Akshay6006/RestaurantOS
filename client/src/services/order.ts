import API from "./api";

export const getOrders = async () => {
  const { data } = await API.get("/orders");
  return data;
};

export const createOrder = async (payload: any) => {
  const { data } = await API.post("/orders", payload);
  return data;
};

export const updateOrderStatus = async (
  id: string,
  status: string
) => {
  const { data } = await API.patch(
    `/orders/${id}/status`,
    { status }
  );

  return data;
};

export const deleteOrder = async (id: string) => {
  const { data } = await API.delete(`/orders/${id}`);
  return data;
};