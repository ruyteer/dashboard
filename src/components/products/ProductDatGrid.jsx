"use client";
import { socket } from "@/config/socket";
import { useMetrics } from "@/context/MetricsContext";
import { productColumns } from "@/data/productDataGridConfig";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect } from "react";

export default async function ProductDataGrid({ apiRef }) {
  const { products, updateProducts } = useMetrics();

  useEffect(() => {
    socket.on("new order", async () => {
      await updateProducts();
    });
    socket.on("new update", () => {
      updateProducts();
    });
  }, [socket]);

  return (
    <>
      <Box width={1300} marginTop={2} marginBottom={10}>
        <DataGrid
          apiRef={apiRef}
          columns={productColumns}
          rows={products}
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
