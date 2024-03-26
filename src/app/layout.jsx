import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "react-toastify/dist/ReactToastify.css";

import theme from "../theme/theme";
import { MetricsProvider } from "@/context/MetricsContext";
import NavbarGlobal from "@/ui/Navbar";
import PushNotifications from "@/components/Notifications";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Haxtera Admin",
  description: "Haxtera Dashboard",
};

export default function RootLayout(props) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <MetricsProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />

            <NavbarGlobal />
            <PushNotifications />
            <ToastContainer />
            {props.children}
          </ThemeProvider>
        </MetricsProvider>
      </body>
    </html>
  );
}
