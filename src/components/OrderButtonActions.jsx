import { useMetrics } from "@/context/MetricsContext";
import { AddTask, Delete, InfoOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Modal, Tooltip } from "@mui/material";
import { useState } from "react";
import InfoModal from "./InfoModal";
import { GetTotalMonth } from "./GetTotalMonth";

export default function OrderButtonActions({ apiRef }) {
  const { deleteOrder, approveOrder } = useMetrics();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    const selectedRows = apiRef.current.getSelectedRows();
    deleteOrder(selectedRows);
  };

  const handleApprove = () => {
    const selectedRows = apiRef.current.getSelectedRows();
    approveOrder(selectedRows);
  };

  return (
    <>
      <Modal open={open}>
        <InfoModal setOpen={setOpen} />
      </Modal>
      <Box
        display={"flex"}
        marginTop={10}
        alignItems={"center"}
        justifyContent={"left"}
        marginLeft={28}
        width={"100%"}
      >
        <Tooltip
          title="Como usar"
          children={
            <IconButton onClick={() => setOpen(true)}>
              <InfoOutlined />
            </IconButton>
          }
        />

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
          startIcon={<AddTask />}
          title="Aprovar pagamento"
          onClick={handleApprove}
        >
          Aprovar
        </Button>
        <GetTotalMonth />
      </Box>
    </>
  );
}
