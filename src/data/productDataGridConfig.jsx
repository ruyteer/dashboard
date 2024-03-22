import { Avatar, Chip } from "@mui/material";
import Link from "next/link";

const productColumns = [
  {
    field: "image",
    headerName: "Imagem",
    renderCell: ({ row }) => (
      <Link href={row.images[0]}>
        <Avatar src={row.images[0]} alt={row.name} />
      </Link>
    ),
  },
  {
    field: "name",
    headerName: "Nome",
    width: 190,
  },
  {
    field: "description",
    headerName: "Descrição",
    width: 220,
  },
  {
    field: "price",
    headerName: "Preço",
    renderCell: ({ row }) => <>R$ {row.price.toFixed(2)}</>,
  },
  {
    field: "stock",
    headerName: "Estoque",
  },
  {
    field: "categoryName",
    headerName: "Categoria",
    width: 250,
    renderCell: ({ row }) => (
      <>
        <Chip variant="outlined" color="default" label={row.categoryName} />
      </>
    ),
  },
];

async function getProductData() {
  const productsResponse = await fetch("https://api.haxtera.com/product");
  const categoryResponse = await fetch("https://api.haxtera.com/category");

  const products = await productsResponse.json();
  const categories = await categoryResponse.json();

  const productsWithCategory = products.map((product, index) => {
    const category = categories.find(
      (result) => result.id === product.categoryId
    );
    return {
      ...product,
      categoryName: category.name,
      id: 0 + index,
      productId: product.id,
    };
  });

  return productsWithCategory;
}

export { productColumns, getProductData };
