import { Button, Chip } from "@mui/material";

const orderColumns = [
  {
    field: "user",
    headerName: "Comprador",
    width: 200,
  },
  {
    field: "userIp",
    headerName: "IP",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 140,
    renderCell: ({ row }) => {
      return (
        <>
          {row.status === "pending" ? (
            <>
              <Chip
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="yellow-circle"></div>
                    <p>Pendente</p>
                  </div>
                }
                variant="outlined"
                color="warning"
              />
            </>
          ) : row.voucher === "Payment failed" ? (
            <>
              <Chip
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="red-circle"></div>
                    <p>Não Autorizado</p>
                  </div>
                }
                variant="outlined"
                color="error"
              />
            </>
          ) : row.status === "approved" || row.status === "succeeded" ? (
            <>
              <Chip
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="green-circle"></div>
                    <p>Aprovada</p>
                  </div>
                }
                variant="outlined"
                color="success"
              />
            </>
          ) : (
            <>
              <Chip
                label={
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <div className="red-circle"></div>
                    <p>{row.status}</p>
                  </div>
                }
                variant="outlined"
                color="error"
              />
            </>
          )}
        </>
      );
    },
  },
  {
    field: "product",
    headerName: "Produto",
    renderCell: ({ row }) => {
      return <>{row.productName}</>;
    },
    width: 140,
  },
  {
    field: "quantity",
    headerName: "Quantidade",
  },
  {
    field: "amount",
    headerName: "Valor",
    width: 100,
  },
  {
    field: "paymentMethod",
    headerName: "Método de Pagamento",
    width: 160,
    renderCell: ({ row }) => {
      const value = row.paymentMethod;
      return (
        <>
          {value === "pix" ? (
            <>
              <img src="/pix.png" alt="PIX" width={60} />
            </>
          ) : value === "mercadopago" ? (
            <>
              <img
                src="/mercadopago.svg"
                alt="Mercado Pago"
                width={100}
                style={{ marginLeft: "-13px" }}
              />
            </>
          ) : (
            <>
              <img src="/stripe.svg" alt="Stripe" width={50} />
            </>
          )}
        </>
      );
    },
  },
  {
    field: "paymentIntent",
    headerName: "Código",
    width: 100,
  },
  {
    field: "voucher",
    headerName: "Comprovante",
    renderCell: (params) => {
      return (
        <>
          {params.row.voucher === "comprovante não enviado" ? (
            <>
              <Button size="small" disabled color="secondary">
                Indisponível
              </Button>
            </>
          ) : (
            <>
              <Button href={params.row.voucher} color="secondary">
                Vizualizar
              </Button>
            </>
          )}
        </>
      );
    },
    width: 120,
  },
  {
    field: "date",
    headerName: "Data",
    width: 150,
  },
];

async function getOrderData() {
  const responseOrders = await fetch("https://api.haxtera.com/order");
  const responseUsers = await fetch("https://api.haxtera.com/user");
  const responseProducts = await fetch("https://api.haxtera.com/product");

  const orders = await responseOrders.json();
  const users = await responseUsers.json();
  const products = await responseProducts.json();

  const sortedOrders = orders.sort((a, b) => {
    const dateA = new Date(
      a.date.replace(
        /(\d{2})\/(\d{2})\/(\d{4}):(\d{2}):(\d{2})/,
        "$3-$2-$1T$4:$5"
      )
    );
    const dateB = new Date(
      b.date.replace(
        /(\d{2})\/(\d{2})\/(\d{4}):(\d{2}):(\d{2})/,
        "$3-$2-$1T$4:$5"
      )
    );
    return dateB - dateA;
  });

  const ordersWithUsers = sortedOrders.map((order) => {
    const user = users.find((user) => user.id === order.userId);

    if (
      order.products[0].toLowerCase().includes("dashbot") ||
      order.products[0].toLowerCase().includes("nenbot")
    ) {
      return {
        ...order,
        username: user ? user.name : "Nome não encontrado",
        productName:
          order.products[0].charAt(0).toUpperCase() +
          order.products[0].slice(1),
      };
    } else {
      const product = products.find(
        (result) => result.id === order.products[0]
      );

      return {
        ...order,
        username: user ? user.name : "Nome não encontrado",
        productName: product ? product.name : "Produto não encontrado",
      };
    }
  });

  let orderRows = [];

  ordersWithUsers.map(async (result, index) =>
    orderRows.push({
      orderId: result.id,
      id: index + 1,
      user: result.username,
      userIp: result.userIp,
      status: result.status,
      quantity: result.quantity,
      amount: result.amount,
      paymentMethod: result.paymentMethod,
      paymentIntent: result.paymentIntent,
      voucher: result.voucher,
      date: result.date,
      productName: result.productName,
    })
  );

  return orderRows;
}

export { orderColumns, getOrderData };
