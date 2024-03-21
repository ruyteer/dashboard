"use client";
import OrderButtonActions from "@/components/OrderButtonActions";
import OrderDataGrid from "@/components/OrderDataGrid";
import { Box, Skeleton } from "@mui/material";
import { useGridApiRef } from "@mui/x-data-grid";
import { Suspense } from "react";

export default function OrderPage() {
  const apiRef = useGridApiRef();

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <OrderButtonActions apiRef={apiRef} />
        <Suspense
          fallback={
            <>
              <Skeleton
                sx={{ bgcolor: "grey.900", marginTop: 2, marginBottom: 10 }}
                variant="rectangular"
                width={1300}
                height={600}
                style={{ borderRadius: "10px" }}
              />
            </>
          }
        >
          <OrderDataGrid apiRef={apiRef} />
        </Suspense>
      </Box>
    </>
  );
}
