"use client";
import { getNewsletter } from "@/data/getNewsletter";
import { Box, Button, Card, Paper } from "@mui/material";
import { useState } from "react";
import { NewsletterModal } from "./NewsletterModal";

export default async function Newsletter() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const newsText = await getNewsletter();

  return (
    <>
      <NewsletterModal
        open={modalIsOpen}
        handleClose={() => setModalIsOpen(false)}
      />
      <Box>
        <Paper
          elevation={3}
          variant="outlined"
          sx={{
            width: "400px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <h1 className="title">Newsletter</h1>

          <p
            style={{
              textAlign: "center",
              marginTop: "10px",
              color: "#999",
            }}
          >
            "{newsText}"
          </p>

          <Button
            sx={{ marginTop: "15px" }}
            color="secondary"
            variant="outlined"
            onClick={() => setModalIsOpen(true)}
          >
            Atualizar newsletter
          </Button>
        </Paper>
      </Box>
    </>
  );
}
