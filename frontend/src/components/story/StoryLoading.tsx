import { Box, CircularProgress, Stack, Typography } from "@mui/material";

function StoryLoading() {
  return (
    <Box
      sx={{
        mt: 4,
        p: 5,
        textAlign: "center",
        borderRadius: 6,
        background: "linear-gradient(135deg,#FEF3C7,#F5F3FF)",
      }}
    >
      <CircularProgress sx={{ mb: 3 }} />

      <Stack spacing={1}>
        <Typography variant="h5" fontWeight={900}>
          ✨ Creating a magical adventure...
        </Typography>

        <Typography color="text.secondary">
          📖 Writing the story...
        </Typography>

        <Typography color="text.secondary">
          🌙 Making it bedtime friendly...
        </Typography>

        <Typography color="text.secondary">
          ⭐ Adding a sweet life lesson...
        </Typography>
      </Stack>
    </Box>
  );
}

export default StoryLoading;