import { useState } from "react";
import useModal from "./useModal";

export default function useMenu() {
  const [anchorElement, handleModalClose, openModal] = useModal(null);
  const [menuItem, setMenuItem] = useState(null);

  const handleMenuClose = () => {
    handleModalClose();
    setMenuItem(null);
  };

  const openMenu = (anchorEl, item) => {
    openModal(anchorEl);
    setMenuItem(item);
  };

  return [anchorElement, menuItem, handleMenuClose, openMenu];
}
