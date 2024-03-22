"use client";
import { alertToast, successToast } from "@/config/toast";
import { getOrderData } from "@/data/dataGridConfig";
import { getMetrics, getProductMetrics } from "@/data/getMetrics";
import { getProductData } from "@/data/productDataGridConfig";
import React, { createContext, useState, useEffect, useContext } from "react";

const MetricsContext = createContext();

export const MetricsProvider = ({ children }) => {
  const [metrics, setMetrics] = useState({
    mpTotal: 1,
    pixTotal: 1,
    stripeTotal: 1,
    stripe: 1,
    mp: 1,
    pix: 1,
  });

  const [products, setProducts] = useState([
    {
      id: 1,
      productId: "",
      name: "",
      price: 0,
      categoryName: "",
      description: "",
      images: [""],
      stock: 0,
    },
  ]);

  const [topProducts, setTopProducts] = useState([
    {
      name: "Omega LA",
      salesCount: 245,
    },
    {
      name: "Omega NA",
      salesCount: 423,
    },
    {
      name: "Alpha LA",
      salesCount: 500,
    },
  ]);

  const [orders, setOrders] = useState([
    {
      id: 1,
      orderId: "",
      user: "",
      userIp: "",
      status: "",
      quantity: "",
      amount: "",
      paymentMethod: "",
      paymentIntent: "",
      voucher: "",
      date: "",
    },
  ]);

  const fetchProducts = async () => {
    const data = await getProductData();
    setProducts(data);
  };

  const fetchTopProducts = async () => {
    const topProduct = await getProductMetrics();
    setTopProducts(topProduct);
  };

  const fetchMetrics = async () => {
    const data = await getMetrics();
    setMetrics(data);
  };

  const fetchOrders = async () => {
    const data = await getOrderData();
    setOrders(data);
  };

  useEffect(() => {
    fetchMetrics();
    fetchTopProducts();
    fetchProducts();
    fetchOrders();
  }, []);

  const updateMetrics = async () => {
    await fetchMetrics();
    await fetchTopProducts();
  };

  const updateOrders = async () => {
    await fetchOrders();
  };
  const updateProducts = async () => {
    await fetchProducts();
  };

  const deleteOrder = async (idList) => {
    if (idList.size === 0) {
      return alertToast("Selecione ao menos uma ordem!");
    }
    idList.forEach(async (result) => {
      try {
        await fetch(`https://api.haxtera.com/order/delete/${result.orderId}`, {
          method: "DELETE",
        });
      } catch (error) {}
    });
    let updatedOrders = orders;

    idList.forEach(async (result) => {
      updatedOrders = updatedOrders.filter(
        (order) => order.orderId !== result.orderId
      );
    });
    setOrders(updatedOrders);
  };

  const approveOrder = async (selectedOrders) => {
    let updatedOrders = [...orders];
    if (selectedOrders.size === 0) {
      return alertToast("Selecione ao menos uma ordem!");
    }
    selectedOrders.forEach(async (result) => {
      const orderToUpdate = updatedOrders.find(
        (order) => order.orderId === result.orderId
      );

      if (result.paymentMethod === "pix") {
        orderToUpdate.status = "succeeded";
        await fetch(
          `https://api.haxtera.com/order/update/${orderToUpdate.orderId}`,
          { method: "POST" }
        );
        successToast("Ordem aprovada com sucesso!");
      } else {
        alertToast("Você só pode aprovar pagamentos PIX!");
      }
    });
    setOrders(updateOrders);
  };

  const deleteProduct = async (selectedProducts) => {
    if (selectedProducts.size === 0) {
      return alertToast("Selecione ao menos um produto!");
    }

    selectedProducts.forEach(async (result) => {
      try {
        await fetch(
          `https://api.haxtera.com/product/delete/${result.productId}`,
          {
            method: "DELETE",
          }
        );
      } catch {}
    });
    let updatedProducts = products;

    selectedProducts.forEach((result) => {
      updatedProducts = updatedProducts.filter(
        (product) => product.id !== result.id
      );
    });
    setProducts(updatedProducts);
  };

  return (
    <MetricsContext.Provider
      value={{
        metrics,
        updateMetrics,
        orders,
        updateOrders,
        deleteOrder,
        approveOrder,
        topProducts,
        updateProducts,
        products,
        deleteProduct,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => useContext(MetricsContext);
