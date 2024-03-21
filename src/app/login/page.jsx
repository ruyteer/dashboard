"use client";
import { errorToast } from "@/config/toast";
import UIForm from "@/ui/Form";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { setCookie } from "cookies-next";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("https://api.haxtera.com/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const accessData = await response.json();

    if (response.ok) {
      // localStorage.setItem("adminToken", accessData.token);
      setCookie("token", accessData.token);
      router.push("/");
    } else {
      setLoading(false);
      errorToast("Usuário ou senha incorretos!");
    }
  };

  return (
    <>
      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        height={"100vh"}
      >
        <h1 className="title">Dashboard Login</h1>

        <UIForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleSubmit={handleSubmit}
          loading={loading}
        />
      </Box>
    </>
  );
}
