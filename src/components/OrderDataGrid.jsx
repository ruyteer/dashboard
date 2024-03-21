"use client";
import { socket } from "@/config/socket";
import { useMetrics } from "@/context/MetricsContext";
import { orderColumns } from "@/data/dataGridConfig";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";

export default async function OrderDataGrid({ apiRef }) {
  const { orders, updateOrders } = useMetrics();

  useEffect(() => {
    socket.on("new order", () => {
      updateOrders();
    });
  }, [socket]);

  return (
    <>
      <Box width={1300} marginTop={2} marginBottom={10}>
        <DataGrid
          apiRef={apiRef}
          columns={orderColumns}
          rows={orders}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          checkboxSelection
          disableRowSelectionOnClick
          pageSizeOptions={[10]}
        />
      </Box>
    </>
  );
}
