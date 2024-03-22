import { Skeleton } from "@mui/material";

export default function ProductPageLoading() {
  return (
    <>
      <Skeleton
        sx={{ bgcolor: "grey.900", marginTop: 2, marginBottom: 10 }}
        variant="rectangular"
        width={1300}
        height={600}
        style={{ borderRadius: "10px" }}
      />
    </>
  );
}
