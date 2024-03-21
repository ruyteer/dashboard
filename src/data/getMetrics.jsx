const handleMakeSoum = (array) => {
  let value = 0;
  array.map((result) => {
    value += result.amount;
  });

  return value.toLocaleString("pt-BR", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
};

const filterTodayOrders = (list) => {
  const now = new Date();
  const today = {
    day: now.getDate(),
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };

  const result = list.filter((order) => {
    const orderDateComponents = order.date.split("/");
    const orderDay = parseInt(orderDateComponents[0]);
    const orderMonth = parseInt(orderDateComponents[1]);
    const orderYear = parseInt(orderDateComponents[2].split(":")[0]);

    return (
      orderDay === today.day &&
      orderMonth === today.month &&
      orderYear === today.year
    );
  });

  return result;
};

async function getOrders() {
  const apiResponse = await fetch("https://api.haxtera.com/order");
  const orders = await apiResponse.json();
  return orders;
}

async function getMetrics() {
  const orders = await getOrders();

  const approvedOrders = orders.filter(
    (result) => result.status === "approved" || result.status === "succeeded"
  );
  const mpApproved = approvedOrders.filter(
    (result) => result.paymentMethod === "mercadopago"
  );
  const pixApproved = approvedOrders.filter(
    (result) => result.paymentMethod === "pix"
  );
  const stripeApproved = approvedOrders.filter(
    (result) => result.paymentMethod === "card"
  );

  const totalApprovedSoum = handleMakeSoum(approvedOrders);
  const mpSold = handleMakeSoum(mpApproved);
  const pixSold = handleMakeSoum(pixApproved);
  const stripeSold = handleMakeSoum(stripeApproved);
  const todayOrders = filterTodayOrders(approvedOrders);
  const todayTotal = handleMakeSoum(todayOrders);

  return {
    orders: approvedOrders.length,
    total: totalApprovedSoum,
    mpTotal: mpSold,
    pixTotal: pixSold,
    stripeTotal: stripeSold,
    pix: pixApproved.length,
    mp: mpApproved.length,
    stripe: stripeApproved.length,
    todayTotal,
  };
}

async function getProductMetrics() {
  const orders = await getOrders();

  const approvedOrders = orders.filter(
    (result) => result.status === "approved" || result.status === "succeeded"
  );

  const productCounts = {};
  // Contar ocorrências de cada produto
  approvedOrders.forEach((order) => {
    order.products.forEach((product) => {
      const productId = product;
      if (!productCounts[productId]) {
        productCounts[productId] = { count: 1, product };
      } else {
        productCounts[productId].count++;
      }
    });
  });

  // Classificar produtos por contagem
  const sortedProducts = Object.values(productCounts).sort(
    (productA, productB) => productB.count - productA.count
  );

  // Pegar os top 3 produtos
  const topProducts = await Promise.all(
    sortedProducts.slice(0, 3).map(async (product) => {
      const productDetails = await getProductById(product.product);
      return { ...productDetails, salesCount: product.count };
    })
  );

  return topProducts;
}

async function getProductById(id) {
  const response = await fetch(`https://api.haxtera.com/product/${id}`);
  return await response.json();
}

export { getMetrics, getProductById, getOrders, getProductMetrics };
