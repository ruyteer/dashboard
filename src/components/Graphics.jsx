"use client";

import { socket } from "@/config/socket";
import { useMetrics } from "@/context/MetricsContext";
import { useEffect } from "react";

import Chart from "react-apexcharts";

export default async function Graphics() {
  const { metrics, updateMetrics } = useMetrics();

  useEffect(() => {
    socket.on("new order", async () => {
      await updateMetrics();
    });
  }, [socket]);

  return (
    <>
      <Chart
        options={{
          chart: { id: "orders", background: "#111" },
          title: {
            text: "Registro de Vendas dos Principais Gateways",
            align: "center",
          },
          xaxis: { categories: ["Mercado pago", "Stripe", "PIX"] },
          theme: { mode: "dark" },
          colors: ["#9130a0c0", "rgba(25, 74, 173, 0.763)"],
          plotOptions: {
            bar: {
              horizontal: false,
            },
          },

          dataLabels: {
            enabled: true,
            offsetY: -6,
            style: {
              fontSize: "12px",
              colors: ["#fff"],
            },
          },

          yaxis: [
            {
              title: {
                text: "Pedidos aprovados",
              },
            },
            {
              opposite: true,
              title: {
                text: "Valor total vendido",
              },
            },
          ],
        }}
        series={[
          {
            name: "Valor total vendido",
            data: [metrics.mpTotal, metrics.stripeTotal, metrics.pixTotal],
          },
          {
            name: "Pedidos aprovados",
            data: [metrics.mp, metrics.stripe, metrics.pix],
          },
        ]}
        type="bar"
        width="700"
      />
    </>
  );
}
