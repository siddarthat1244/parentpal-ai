import {
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SmartToyIcon from "@mui/icons-material/SmartToy";

interface Props {
  childName?: string;
}

function HeroCard({ childName }: Props) {
  const hour = new Date().getHours();

  let greeting = "Good Evening 🌙";

  if (hour < 12) greeting = "Good Morning ☀️";
  else if (hour < 18) greeting = "Good Afternoon 🌤";

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 6,
        color: "white",
        background:
          "linear-gradient(135deg,#6366F1,#8B5CF6)",
        mb: 4,
      }}
    >
      <Typography variant="h4" fontWeight={800}>
        {greeting}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          mb: 4,
          opacity: 0.9,
        }}
      >
        {childName
          ? `${childName} is ready for tonight's story.`
          : "Welcome to ParentPal AI."}
      </Typography>

      <Stack direction="row" spacing={2}>
        <Button
          variant="contained"
          color="warning"
          startIcon={<AutoStoriesIcon />}
        >
          Create Story
        </Button>

        <Button
          variant="outlined"
          sx={{
            color: "white",
            borderColor: "white",
          }}
          startIcon={<SmartToyIcon />}
        >
          Ask AI
        </Button>
      </Stack>
    </Box>
  );
}

export default HeroCard;