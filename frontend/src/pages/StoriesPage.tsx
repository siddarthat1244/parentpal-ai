import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplayIcon from "@mui/icons-material/Replay";
import StarIcon from "@mui/icons-material/Star";
import DownloadIcon from "@mui/icons-material/Download";
import PrintIcon from "@mui/icons-material/Print";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopIcon from "@mui/icons-material/Stop";
import { Snackbar } from "@mui/material";

import { useStory } from "../hooks/useStory";
import { getActiveChildProfile } from "../utils/childProfileStorage";
import {
  downloadStoryAsPdf,
  printStory,
  saveFavoriteStory,
} from "../utils/storyActions";
import { readStoryAloud, stopReadingAloud } from "../utils/readAloud";
import { getStoryEmoji } from "../utils/storyCover";

function StoriesPage() {
  const [theme, setTheme] = useState("");
  const [length, setLength] = useState("Short");
  const [moral, setMoral] = useState("");

  const { story, loading, error, createStory } = useStory();
  const activeChild = getActiveChildProfile();

  const storyTitle = activeChild
    ? `${activeChild.name}'s Bedtime Story`
    : "ParentPal Bedtime Story";

  const storyEmoji = getStoryEmoji(theme || storyTitle);
  const [favoriteMessage, setFavoriteMessage] = useState("");
  const currentStory = {
    id: crypto.randomUUID(),
    title: storyTitle,
    story,
    childName: activeChild?.name,
    createdAt: new Date().toISOString(),
  };

  const handleGenerate = async () => {
    await createStory(theme || "Magical bedtime adventure", length, moral);
  };
  const handleSaveFavorite = () => {
  const saved = saveFavoriteStory(currentStory);

  setFavoriteMessage(
    saved ? "Story saved to favorites." : "Story is already in favorites."
  );
};

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Bedtime Story Generator
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Create a personalized story using the active child profile.
      </Typography>

      <Card
        sx={{
          borderRadius: 4,
          mb: 4,
          background: "linear-gradient(135deg, #EEF2FF, #F5F3FF)",
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Stack direction="row" spacing={2} alignItems="center">
            <AutoStoriesIcon color="primary" sx={{ fontSize: 48 }} />

            <Box>
              <Typography variant="h5" fontWeight={800}>
                Create Tonight&apos;s Story
              </Typography>

              <Typography color="text.secondary">
                {activeChild
                  ? `Personalized for ${activeChild.name}`
                  : "Select or create a child profile for best results"}
              </Typography>
            </Box>
          </Stack>
        </CardContent>
      </Card>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <TextField
              label="Story Theme"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              placeholder="Example: Space adventure"
              fullWidth
            />

            <TextField
              select
              label="Story Length"
              value={length}
              onChange={(e) => setLength(e.target.value)}
              fullWidth
            >
              <MenuItem value="Short">Short - 2 minutes</MenuItem>
              <MenuItem value="Medium">Medium - 5 minutes</MenuItem>
              <MenuItem value="Long">Long - 8 minutes</MenuItem>
            </TextField>

            <TextField
              label="Moral Lesson"
              value={moral}
              onChange={(e) => setMoral(e.target.value)}
              placeholder="Example: Be kind, share toys, try new foods"
              fullWidth
            />

            {error && <Alert severity="error">{error}</Alert>}

            <Button
              variant="contained"
              size="large"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "✨ Generate Story"
              )}
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {story && (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 4,
            background: "linear-gradient(180deg, #FFFFFF 0%, #FFFBEB 100%)",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <StarIcon color="warning" />
              <Typography variant="h5" fontWeight={800}>
                Tonight&apos;s Story
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              <Chip label={length} color="primary" />
              {activeChild && <Chip label={activeChild.name} />}
              {moral && <Chip label={`Moral: ${moral}`} variant="outlined" />}
            </Stack>

            <Box
              sx={{
                height: 220,
                borderRadius: 4,
                background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
                color: "white",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography sx={{ fontSize: 64 }}>{storyEmoji}</Typography>

              <Typography variant="h4" fontWeight={900}>
                {storyTitle}
              </Typography>

              <Typography sx={{ opacity: 0.9, mt: 1 }}>
                A personalized story by ParentPal AI
              </Typography>
            </Box>

            <Divider />

            <Typography
              sx={{
                whiteSpace: "pre-line",
                fontSize: 18,
                lineHeight: 1.8,
              }}
            >
              {story}
            </Typography>

            <Divider />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="outlined"
                startIcon={<FavoriteIcon />}
                onClick={handleSaveFavorite}
              >
                Save Favorite
              </Button>

              <Button
                variant="outlined"
                startIcon={<VolumeUpIcon />}
                onClick={() => readStoryAloud(story)}
              >
                Read Aloud
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<StopIcon />}
                onClick={stopReadingAloud}
              >
                Stop
              </Button>

              <Button
                variant="outlined"
                startIcon={<PrintIcon />}
                onClick={printStory}
              >
                Print
              </Button>

              <Button
                variant="outlined"
                startIcon={<DownloadIcon />}
                onClick={() => downloadStoryAsPdf(currentStory)}
              >
                Download PDF
              </Button>

              <Button
                variant="outlined"
                startIcon={<ReplayIcon />}
                onClick={handleGenerate}
              >
                Generate Another
              </Button>
            </Stack>
          </Stack>
        </Paper>
      )}
      <Snackbar
        open={Boolean(favoriteMessage)}
        autoHideDuration={3000}
        onClose={() => setFavoriteMessage("")}
        message={favoriteMessage}
/>
    </Box>
  );
}

export default StoriesPage;