import { useState } from "react";

export default function useModal(closeValue = false) {
  const [modalOpen, setModalOpen] = useState(closeValue);

  const handleModalClose = () => {
    setModalOpen(closeValue);
  };

  const openModal = (openValue = true) => {
    setModalOpen(openValue);
  };

  return [modalOpen, handleModalClose, openModal];
}
