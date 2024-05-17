import { Button, List, ListItem, Modal } from "@mui/material";
import React from "react";

const ProductSearchModal = ({ isOpen, onClose, products }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <div
        style={{ width: 300, height: 400, backgroundColor: "white", padding: 20 }}
      >
        <List>
          {products.map((product) => (
            <ListItem key={product.pno}>{product.pname}</ListItem>
          ))}
        </List>
        <Button onClick={onClose}>Close</Button>
      </div>
    </Modal>
  );
};

export default ProductSearchModal;
