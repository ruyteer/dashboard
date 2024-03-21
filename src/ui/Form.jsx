import validatorString from "@/data/validatorString";
import { Box, Button, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useState } from "react";

export default function UIForm({
  username,
  password,
  setUsername,
  setPassword,
  handleSubmit,
  loading,
}) {
  const [valid, setValid] = useState(false);
  return (
    <Box
      component={"form"}
      marginTop={5}
      autoComplete="off"
      sx={{ backgroundColor: "#111", border: "1px solid #333" }}
      padding={5}
      borderRadius={3}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      onSubmit={handleSubmit}
    >
      <TextField
        required
        color="success"
        variant="outlined"
        label="Usuário"
        InputProps={{
          style: { color: "white" },
        }}
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          const validResult = validatorString(e.target.value);
          console.log(validResult);
          setValid(validResult);
        }}
        error={valid}
        helperText={valid ? "O nome de usuário não pode conter números!" : ""}
      />
      <TextField
        required
        color="success"
        variant="outlined"
        type="password"
        label="Senha"
        InputProps={{
          style: { color: "white" },
        }}
        sx={{ marginTop: "15px" }}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoadingButton
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: "15px" }}
        type="submit"
        loading={loading}
      >
        Login
      </LoadingButton>
    </Box>
  );
}
