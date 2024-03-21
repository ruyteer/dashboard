import { Info } from "@mui/icons-material";
import { Box, Button } from "@mui/material";

export default function InfoModal({ setOpen }) {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      height={"100vh"}
    >
      <Box
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        textAlign={"center"}
        sx={{ backgroundColor: "#111" }}
        padding={8}
        borderRadius={5}
      >
        <h1
          className="title"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            justifyContent: "center",
          }}
        >
          <Info /> Como usar?
        </h1>
        <p className="paragraf">
          Para excluir uma ordem de compra, <br />
          selecione a mesma e clique em "Excluir". <br />
          Você pode filtrar as ordens ao seu gosto. <br /> Para realizar uma
          busca, selecione a coluna <br /> desejada e clique em "Filter".
        </p>
        <Button
          color="secondary"
          variant="outlined"
          fullWidth
          sx={{ marginTop: "20px" }}
          onClick={() => setOpen(false)}
        >
          Fechar
        </Button>
      </Box>
    </Box>
  );
}
