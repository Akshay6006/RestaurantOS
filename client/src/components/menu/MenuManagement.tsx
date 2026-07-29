"use client";

import { useEffect, useState } from "react";
import { Menu } from "@/types/menu";
import { getMenus } from "@/services/menu";

import MenuToolbar from "./MenuToolbar";
import MenuTable from "./MenuTable";
import AddDishModal from "./AddDishModal";
import EditDishModal from "./EditDishModal";
import DeleteDialog from "./DeleteDialog";

export default function MenuManagement() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [selectedMenu, setSelectedMenu] = useState<Menu | null>(null);

  const fetchMenus = async () => {
    try {
      setLoading(true);

      const res = await getMenus();

      setMenus(res.menus);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const filteredMenus = menus.filter((item) => {
    const searchMatch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const categoryMatch =
      category === "All" || item.category === category;

    return searchMatch && categoryMatch;
  });

  return (
    <div className="space-y-6">

      <MenuToolbar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        onAddDish={() => setOpenAddModal(true)}
      />

      <MenuTable
        menus={filteredMenus}
        loading={loading}
        onEdit={(menu) => {
          setSelectedMenu(menu);
          setOpenEditModal(true);
        }}
        onDelete={(menu) => {
          setSelectedMenu(menu);
          setOpenDeleteModal(true);
        }}
      />

      <AddDishModal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        refreshMenus={fetchMenus}
      />

      <EditDishModal
        open={openEditModal}
        menu={selectedMenu}
        onClose={() => {
          setOpenEditModal(false);
          setSelectedMenu(null);
        }}
        refreshMenus={fetchMenus}
      />

      <DeleteDialog
        open={openDeleteModal}
        menu={selectedMenu}
        onClose={() => {
          setOpenDeleteModal(false);
          setSelectedMenu(null);
        }}
        refreshMenus={fetchMenus}
      />

    </div>
  );
}