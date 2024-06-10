export function calcMonthOrder(orders) {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const filteredOrders = orders.filter(
    (result) =>
      (result.date.includes(`${month}/${year}`) &&
        result.status === "approved") ||
      result.status === "success"
  );

  let totalAmount = 0;
  filteredOrders.forEach((order) => {
    totalAmount = order.amount + totalAmount;
  });

  return totalAmount;
}
