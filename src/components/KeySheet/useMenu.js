import { useState } from "react";


export default function useMenu() {

  const [menuItem, setMenuItem] = useState(null);

  const handleMenuClose = () => {
  };

  setMenuItem(null);
  const openMenu = (anchorEl, item) => {

    setMenuItem(item);
  };

  return [ menuItem, handleMenuClose, openMenu];

}