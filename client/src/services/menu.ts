import API from "./api";

export const getMenus = async () => {
  const { data } = await API.get("/menu");
  return data;
};

export const createMenu = async (menuData: any) => {
  const { data } = await API.post("/menu", menuData);
  return data;
};

export const updateMenu = async (
  id: string,
  menuData: any
) => {
  const { data } = await API.put(`/menu/${id}`, menuData);
  return data;
};

export const deleteMenu = async (id: string) => {
  const { data } = await API.delete(`/menu/${id}`);
  return data;
};

export const getMenuById = async (id: string) => {
  const { data } = await API.get(`/menu/${id}`);
  return data;
};