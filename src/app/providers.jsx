"use client";
import { ThemeProvider } from "@mui/material";

export default function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
