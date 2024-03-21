"use client";
import { alertToast, successToast } from "@/config/toast";
import { getOrderData } from "@/data/dataGridConfig";
import { getMetrics } from "@/data/getMetrics";
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
    fetchOrders();
  }, []);

  const updateMetrics = async () => {
    await fetchMetrics();
  };

  const updateOrders = async () => {
    await fetchOrders();
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

  return (
    <MetricsContext.Provider
      value={{
        metrics,
        updateMetrics,
        orders,
        updateOrders,
        deleteOrder,
        approveOrder,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

export const useMetrics = () => useContext(MetricsContext);
