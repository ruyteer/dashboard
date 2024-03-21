import {
  Box,
  Button,
  FormControl,
  Modal,
  Paper,
  TextField,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { updateNewsletter } from "@/data/getNewsletter";
import { useState } from "react";

export function NewsletterModal({ open, handleClose }) {
  const [text, setText] = useState("");
  const handleSubmit = async () => {
    await updateNewsletter(text);
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose}>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent={"center"}
          height={"100vh"}
        >
          <Paper
            variant="outlined"
            sx={{
              padding: "35px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h1 className="title">Atualizar Newsletter</h1>
            <FormControl sx={{ marginTop: "20px" }}>
              <TextField
                variant="standard"
                color="secondary"
                label="Nova Newsletter"
                fullWidth
                size="medium"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />

              <Button
                sx={{ marginTop: "20px" }}
                variant="contained"
                color="secondary"
                onClick={handleSubmit}
                startIcon={<SaveIcon />}
              >
                Salvar
              </Button>
            </FormControl>
          </Paper>
        </Box>
      </Modal>
    </>
  );
}
