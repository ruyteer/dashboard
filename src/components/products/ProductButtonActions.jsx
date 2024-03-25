import { useMetrics } from "@/context/MetricsContext";
import { Add, Delete } from "@mui/icons-material";
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import CreateProductModal from "./CreateProductModal";

export default function ProductButtonActions({ apiRef }) {
  const { deleteProduct } = useMetrics();
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const handleDelete = async () => {
    const selectedRows = apiRef.current.getSelectedRows();
    await deleteProduct(selectedRows);
  };

  return (
    <>
      <Modal
        open={createModalOpen}
        children={<CreateProductModal closeModal={setCreateModalOpen} />}
        onClose={() => setCreateModalOpen(false)}
        closeAfterTransition
      />
      <Box
        display={"flex"}
        marginTop={10}
        alignItems={"center"}
        justifyContent={"left"}
        marginLeft={28}
        width={"100%"}
      >
        <Button
          variant="outlined"
          color="error"
          startIcon={<Delete />}
          title="Excluir pedido"
          onClick={handleDelete}
        >
          Excluir
        </Button>

        <Button
          sx={{ marginLeft: 2 }}
          variant="outlined"
          color="success"
          startIcon={<Add />}
          title="Aprovar pagamento"
          onClick={() => setCreateModalOpen(true)}
        >
          Criar
        </Button>
      </Box>
    </>
  );
}
