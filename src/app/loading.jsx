"use client";
import { Box, Skeleton } from "@mui/material";

export default function CardsLoading() {
  return (
    <>
      <Box display={"flex"} gap={10}>
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          variant="rectangular"
          width={260}
          height={200}
          style={{ borderRadius: "10px" }}
        />
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          variant="rectangular"
          width={260}
          height={200}
          style={{ borderRadius: "10px" }}
        />
        <Skeleton
          sx={{ bgcolor: "grey.900" }}
          variant="rectangular"
          width={260}
          height={200}
          style={{ borderRadius: "10px" }}
        />
      </Box>
    </>
  );
}
