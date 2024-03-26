const { Box } = require("@mui/material");
const {
  GridToolbarQuickFilter,
  GridToolbarExport,
  GridToolbarExportContainer,
} = require("@mui/x-data-grid");

export default function QuickSearchToolbar() {
  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        justifyContent: "left",
        gap: 5,
      }}
    >
      <GridToolbarQuickFilter
        color="secondary"
        variant="outlined"
        placeholder="Pesquisar"
        size="small"
      />

      <GridToolbarExport />
    </Box>
  );
}
