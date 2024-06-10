import { useMetrics } from "@/context/MetricsContext";
import { calcMonthOrder } from "@/data/calcMonthOrder";

export function GetTotalMonth() {
  const { orders } = useMetrics();

  const totalAmount = calcMonthOrder(orders);

  return (
    <>
      <p
        style={{
          color: "white",
          marginLeft: "15px",
        }}
      >
        Total vendido no mês:{" "}
        <span style={{ fontWeight: "bold", fontSize: "18px" }}>
          R$ {totalAmount.toFixed(2)}
        </span>
      </p>
    </>
  );
}
