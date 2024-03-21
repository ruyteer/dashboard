"use client";

import { useState } from "react";
import DrawerMenu from "./LateralMenu";
import { Avatar, Badge, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export default function NavbarGlobal() {
  const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
      backgroundColor: "#44b700",
      color: "#44b700",
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      "&::after": {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        borderRadius: "50%",
        animation: "ripple 1.2s infinite ease-in-out",
        border: "1px solid currentColor",
        content: '""',
      },
    },
    "@keyframes ripple": {
      "0%": {
        transform: "scale(.8)",
        opacity: 1,
      },
      "100%": {
        transform: "scale(2.4)",
        opacity: 0,
      },
    },
  }));
  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        height: "80px",
        backgroundColor: "transparent",
        paddingTop: "15px",
      }}
    >
      <img src="/logo.png" alt="Logo Haxtera" />

      <Box
        display={"flex"}
        flexDirection={"column"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <StyledBadge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          variant="dot"
        >
          <Avatar
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/669275b5-9f1a-44d1-a2b0-76a7b7fb74e5/dd8jal9-d559aeff-ad2e-444d-a681-ec8ea74a2226.png/v1/fill/w_1280,h_1280,q_80,strp/agunimon_avatar_by_zeskii_dd8jal9-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcLzY2OTI3NWI1LTlmMWEtNDRkMS1hMmIwLTc2YTdiN2ZiNzRlNVwvZGQ4amFsOS1kNTU5YWVmZi1hZDJlLTQ0NGQtYTY4MS1lYzhlYTc0YTIyMjYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.jCth5AbdDMXMaP00XaTCipSN0_D82FurFfKBFS8Ah4o"
            alt="Digimon Avatar"
          />
        </StyledBadge>
        <p
          style={{
            color: "white",
            fontSize: "12px",
            fontWeight: "500",
            marginTop: "5px",
          }}
        >
          HaxAdmin
        </p>
      </Box>

      <DrawerMenu />
    </nav>
  );
}
