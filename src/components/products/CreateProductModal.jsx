import { getCategoryByName } from "@/data/categoryOptions";
import FormModal from "@/ui/FormModal";
import { Create } from "@mui/icons-material";
import { useState } from "react";

export default async function CreateProductModal() {
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
      console.log("ok");
    }
  };

  return (
    <>
      <FormModal
        handleSubmit={handleSubmit}
        setInputValue={setInputValue}
        title={
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Create /> Criar Produto
          </div>
        }
      />
    </>
  );
}
