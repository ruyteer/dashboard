"use client";
import { Box, CircularProgress, Skeleton } from "@mui/material";
import { Suspense } from "react";
import CardListInfos from "@/components/CardListInfos";
import CardsLoading from "./loading";
import Graphics from "@/components/Graphics";
import RadialGraphics from "@/components/RadialGraphics";

import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <main
        style={{
          display: "flex",
          gap: "30px",
          justifyContent: "center",
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          marginTop={10}
          width={450}
        >
          <Suspense
            fallback={
              <Skeleton
                sx={{ bgcolor: "grey.900" }}
                variant="rectangular"
                width={260}
                height={200}
                style={{ borderRadius: "10px" }}
              />
            }
          >
            <Newsletter />
          </Suspense>

          <Suspense fallback={<CircularProgress color="secondary" size={50} />}>
            <RadialGraphics />
          </Suspense>
        </Box>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={5}
          marginTop={10}
          marginBottom={10}
        >
          <Suspense fallback={<CardsLoading />}>
            <CardListInfos />
          </Suspense>

          <Suspense fallback={<CircularProgress color="secondary" size={50} />}>
            <Graphics />
          </Suspense>
        </Box>
      </main>
    </>
  );
}
