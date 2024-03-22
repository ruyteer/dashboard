"use client";
import BoxCenter from "@/ui/BoxCenter";
import { Suspense } from "react";
import ProductPageLoading from "./loading";
import ProductDataGrid from "@/components/products/ProductDatGrid";
import { useGridApiRef } from "@mui/x-data-grid";
import ProductButtonActions from "@/components/products/ProductButtonActions";

export default function ProductPage() {
  const apiRef = useGridApiRef();

  return (
    <>
      <BoxCenter>
        <Suspense fallback={<ProductPageLoading />}>
          <ProductButtonActions apiRef={apiRef} />
          <ProductDataGrid apiRef={apiRef} />
        </Suspense>
      </BoxCenter>
    </>
  );
}
