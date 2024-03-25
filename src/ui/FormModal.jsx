import {
  InputAdornment,
  Paper,
  TextField,
  Autocomplete,
  Button,
  FormControl,
} from "@mui/material";
import BoxCenter from "./BoxCenter";
import { useState } from "react";
import { NumericFormatCustom } from "./NumericFormatCustom";
import { FileUpload } from "@mui/icons-material";
import { categoryOptions } from "@/data/categoryOptions";
import { LoadingButton } from "@mui/lab";

export default function FormModal({
  title,
  handleSubmit,
  setInputValue,
  closeModal,
}) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <BoxCenter height={"100vh"}>
        <Paper variant="outlined" sx={{ padding: 6, width: 600 }}>
          <BoxCenter>
            <h1 className="title">{title}</h1>

            <form
              onSubmit={(e) => handleSubmit(e)}
              style={{ marginTop: 30, width: "100%" }}
            >
              <BoxCenter width={"100%"}>
                <FormControl fullWidth>
                  <TextField
                    name="name"
                    label="Nome"
                    variant="outlined"
                    color="secondary"
                    placeholder="Ex: Alpha LA Teras"
                    fullWidth
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Descrição"
                    name="description"
                    variant="outlined"
                    color="secondary"
                    placeholder="Ex: Servidor Alphamon"
                    sx={{ marginTop: 2 }}
                    fullWidth
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Estoque"
                    name="stock"
                    variant="outlined"
                    color="secondary"
                    placeholder="Ex: 670"
                    sx={{ marginTop: 2 }}
                    fullWidth
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    label="Preço"
                    name="price"
                    variant="outlined"
                    color="secondary"
                    placeholder="109.90"
                    type=""
                    sx={{ marginTop: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">$</InputAdornment>
                      ),
                      inputComponent: NumericFormatCustom,
                    }}
                    fullWidth
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <TextField
                    variant="outlined"
                    label="Imagem"
                    name="file"
                    color="secondary"
                    placeholder="Arraste e solte a imagem aqui"
                    type="file"
                    sx={{ marginTop: 2 }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FileUpload />
                        </InputAdornment>
                      ),
                    }}
                    fullWidth
                    required
                  />
                </FormControl>
                <FormControl fullWidth>
                  <Autocomplete
                    onInputChange={(event, newInputValue) => {
                      setInputValue(newInputValue);
                    }}
                    sx={{ marginTop: 2 }}
                    fullWidth
                    color="secondary"
                    options={categoryOptions}
                    renderInput={(params) => (
                      <TextField required {...params} label="Categoria" />
                    )}
                  />
                </FormControl>
              </BoxCenter>

              <Button
                variant="contained"
                color="secondary"
                fullWidth
                type="submit"
                sx={{ marginTop: 3 }}
                disableFocusRipple
                onClick={() => setLoading(true)}
              >
                Enviar
              </Button>
              <LoadingButton
                variant="text"
                color="inherit"
                fullWidth
                onClick={() => closeModal(false)}
                sx={{ marginTop: 1 }}
              >
                Fechar
              </LoadingButton>
            </form>
          </BoxCenter>
        </Paper>
      </BoxCenter>
    </>
  );
}
