import { errorToast, successToast } from "@/config/toast";
import { getCategoryByName } from "@/data/categoryOptions";
import FormModal from "@/ui/FormModal";
import { Create } from "@mui/icons-material";
import { useState } from "react";

export default async function CreateProductModal({ closeModal }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const category = await getCategoryByName(inputValue);
    const formData = new FormData(e.target);

    const response = await fetch(
      `https://api.haxtera.com/product/create/${category.id}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (response.ok) {
      successToast("Produto criado com sucesso!");
      closeModal(false);
    } else {
      const errorResponse = await response.json();
      errorToast(`Houve um erro ao criar o produto! Log: ${errorResponse}`);
    }
  };

  return (
    <>
      <FormModal
        handleSubmit={handleSubmit}
        setInputValue={setInputValue}
        closeModal={closeModal}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Create /> Criar Produto
          </div>
        }
      />
    </>
  );
}
