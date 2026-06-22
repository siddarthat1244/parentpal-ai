import { Box, Button, Stack, Typography } from "@mui/material";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Link } from "react-router-dom";

interface Props {
  childName?: string;
}

function HeroBanner({ childName }: Props) {
  const hour = new Date().getHours();

  const greeting =
    hour < 12 ? "☀️ Good Morning" : hour < 18 ? "🌤 Good Afternoon" : "🌙 Good Evening";

  const message =
    hour >= 18
      ? `${childName || "Your child"} is ready for tonight's bedtime adventure.`
      : `Plan something meaningful for ${childName || "your child"} today.`;

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 6,
        color: "white",
        background: "linear-gradient(135deg, #6366F1, #8B5CF6, #A855F7)",
        mb: 4,
        boxShadow: "0 20px 50px rgba(99,102,241,.25)",
      }}
    >
      <Typography variant="h3" fontWeight={900}>
        {greeting}, Siddartha
      </Typography>

      <Typography sx={{ mt: 1, mb: 4, fontSize: 18, opacity: 0.95 }}>
        {message}
      </Typography>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          variant="contained"
          color="warning"
          size="large"
          startIcon={<AutoStoriesIcon />}
          component={Link}
          to="/stories"
        >
          Create Story
        </Button>

        <Button
          variant="outlined"
          size="large"
          startIcon={<SmartToyIcon />}
          component={Link}
          to="/ask"
          sx={{ color: "white", borderColor: "white" }}
        >
          Ask AI
        </Button>
      </Stack>
    </Box>
  );
}

export default HeroBanner;