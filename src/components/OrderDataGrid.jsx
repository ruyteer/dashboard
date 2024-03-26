"use client";
import { socket } from "@/config/socket";
import { useMetrics } from "@/context/MetricsContext";
import { orderColumns } from "@/data/dataGridConfig";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect } from "react";
import QuickSearchToolbar from "./GridSearchToolbar";

export default async function OrderDataGrid({ apiRef }) {
  const { orders, updateOrders } = useMetrics();

  useEffect(() => {
    socket.on("new order", () => {
      updateOrders();
    });
    socket.on("new update", () => {
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
          slots={{ toolbar: QuickSearchToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
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
