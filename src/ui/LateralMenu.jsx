"use client";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PaymentsIcon from "@mui/icons-material/Payments";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import GroupIcon from "@mui/icons-material/Group";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import Link from "next/link";

export default function DrawerMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <h1
        style={{
          fontSize: "20px",
          textAlign: "left",
          margin: "20px",
          fontWeight: "600",
          alignItems: "center",
          display: "flex",
          gap: "10px",
        }}
      >
        <Menu /> Menu
      </h1>
      <List>
        <ListItem disablePadding>
          <ListItemButton href="/admin-hx">
            <ListItemIcon>
              <DataThresholdingIcon />
            </ListItemIcon>
            <ListItemText primary={"Métricas"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton href="/admin-hx/pedidos">
            <ListItemIcon>
              <PaymentsIcon />
            </ListItemIcon>

            <ListItemText primary={"Pedidos"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>

            <ListItemText primary={"Usuários"} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <Button onClick={toggleDrawer(true)} color="secondary" variant="outlined">
        <Menu />
      </Button>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
