import CardItem from "@/ui/Card";
import { Box, Skeleton } from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import { useMetrics } from "@/context/MetricsContext";
import { useEffect } from "react";
import { socket } from "@/config/socket";

export default async function CardListInfos() {
  const { metrics, updateMetrics } = useMetrics();

  useEffect(() => {
    socket.on("new order", async () => {
      await updateMetrics();
    });

    socket.on("approve payment", async () => {
      await updateMetrics();
    });
  }, [socket]);

  return (
    <>
      <Box display={"flex"} gap={10}>
        <CardItem
          title={"Pedidos"}
          icon={<PaymentsIcon />}
          paragraf={"Número de pedidos aprovados"}
          data={metrics.orders}
        />
        <CardItem
          title={"Pedidos"}
          icon={<PaymentsIcon />}
          paragraf={"Total vendido"}
          data={<>R$ {metrics.total}</>}
        />
        <CardItem
          title={"Pedidos"}
          icon={<PaymentsIcon />}
          paragraf={"Total vendido hoje"}
          data={<>R$ {metrics.todayTotal}</>}
        />
      </Box>
    </>
  );
}
