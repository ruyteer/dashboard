import { Card, CardContent, CardActions, Box, Button } from "@mui/material";

export default function CardItem({ title, paragraf, data, icon }) {
  return (
    <Box sx={{ width: 275 }}>
      <Card
        variant="outlined"
        sx={{ backgroundColor: "#111", borderColor: "#333" }}
      >
        <CardContent>
          <h1
            style={{
              color: "whitesmoke",
              fontSize: "23px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            {icon} {title}
          </h1>
          <p style={{ color: "#ffffff9c", fontSize: "13px" }}>{paragraf}</p>

          <h2 style={{ color: "whitesmoke", marginTop: "10px" }}>{data}</h2>
        </CardContent>
        <CardActions>
          <Button color="secondary" href="/pedidos">
            saber mais
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
