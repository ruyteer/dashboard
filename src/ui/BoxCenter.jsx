import { Box } from "@mui/material";

export default function BoxCenter({ children, ...props }) {
  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        {...props}
      >
        {children}
      </Box>
    </>
  );
}
