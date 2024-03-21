"use client";
import { socket } from "@/config/socket";
import { useEffect } from "react";

export default function PushNotifications() {
  useEffect(() => {
    socket.on("new order", (data) => {
      // addNotification({
      //   title: "Novo pedido! 🎉",
      //   message: `Um cliente deseja receber o produto ${data.productName}`,
      //   native: true,
      //   duration: 100000,
      //   icon: "https://epipoca.com.br/wp-content/uploads/2022/07/Tai-e-Agumon-1200x900.jpeg",
      //   vibrate: [325],
      // });
    });
  }, [socket]);

  return null;
}
