"use client";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { getProductMetrics } from "@/data/getMetrics";
import { Paper } from "@mui/material";

export default async function RadialGraphics() {
  const topProducts = await getProductMetrics();

  return (
    <Paper
      variant="outlined"
      elevation={5}
      style={{
        backgroundColor: "#111",
        padding: "15px",
        marginLeft: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <h1
        className="title"
        style={{
          marginBottom: "20px",
        }}
      >
        Produtos mais vendidos
      </h1>
      <Chart
        options={{
          chart: {
            id: "product",
          },

          colors: ["#8622aa", "#223faa", "#46aa22"],
          legend: { labels: { colors: ["#fff", "#fff", "#fff"] } },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: "70%",
                background: "#111",
              },

              track: {
                dropShadow: {
                  enabled: true,
                  top: 2,
                  left: 0,
                  blur: 4,
                  opacity: 0.15,
                },
              },
              dataLabels: {
                name: {
                  offsetY: -10,
                  color: "#fff",
                  fontSize: "13px",
                },
                value: {
                  color: "#fff",
                  fontSize: "30px",
                  show: true,
                },
              },
            },
          },
          fill: {
            type: "gradient",
            gradient: {
              shade: "dark",
              type: "vertical",
              gradientToColors: ["#87D4F9"],
              stops: [0, 100],
            },
          },
          stroke: {
            lineCap: "round",
            colors: ["#333"],
            width: 2,
          },

          labels: [
            topProducts[0].name,
            topProducts[1].name,
            topProducts[2].name,
          ],
        }}
        series={[
          topProducts[0].salesCount,
          topProducts[1].salesCount,
          topProducts[2].salesCount,
        ]}
        width={450}
        type="pie"
      />
    </Paper>
  );
}
