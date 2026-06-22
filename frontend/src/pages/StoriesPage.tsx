import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import StarIcon from "@mui/icons-material/Star";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopIcon from "@mui/icons-material/Stop";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";

import PageHeader from "../components/ui/PageHeader";
import ThemeSelector from "../components/story/ThemeSelector";
import LengthSelector from "../components/story/LengthSelector";
import MoralSelector from "../components/story/MoralSelector";
import StoryLoading from "../components/story/StoryLoading";

import { useStory } from "../hooks/useStory";
import { getActiveChildProfile } from "../utils/childProfileStorage";
import {
  saveFavoriteStory,
  printStory,
  downloadStoryAsPdf,
} from "../utils/storyActions";
import { readStoryAloud, stopReadingAloud } from "../utils/readAloud";
import StoryTypeSelector from "../components/story/StoryTypeSelector";

function StoriesPage() {
  const activeChild = getActiveChildProfile();

  const [theme, setTheme] = useState("Space");
  const [length, setLength] = useState("Medium");
  const [moral, setMoral] = useState("Kindness");
  const [customTheme, setCustomTheme] = useState("");
  const [storyType, setStoryType] = useState("Imagination");

  const { story, loading, error, createStory } = useStory();

  const storyTitle = activeChild
    ? `${activeChild.name}'s Bedtime Story`
    : "ParentPal Bedtime Story";

  const currentStory = {
    id: crypto.randomUUID(),
    title: storyTitle,
    story,
    childName: activeChild?.name,
    createdAt: new Date().toISOString(),
  };

 const handleGenerate = async () => {
  const finalTheme = theme === "Custom" ? customTheme.trim() : theme;

  if (!finalTheme) {
    return;
  }

  await createStory(finalTheme, length, moral,storyType);
};

  return (
    <Box>
      <PageHeader
        title="Story Creator"
        subtitle={`Create a magical bedtime adventure${
          activeChild ? ` for ${activeChild.name}` : ""
        }`}
      />

      <Card
        sx={{
          mb: 4,
          borderRadius: 6,
          background: "linear-gradient(135deg,#EEF2FF,#F5F3FF)",
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <StoryTypeSelector value={storyType} onChange={setStoryType} />
          <ThemeSelector
            value={theme}
            customTheme={customTheme}
            onChange={setTheme}
            onCustomThemeChange={setCustomTheme}
            />

          <LengthSelector value={length} onChange={setLength} />

          <MoralSelector value={moral} onChange={setMoral} />

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Button
            fullWidth
            size="large"
            variant="contained"
            startIcon={<AutoStoriesIcon />}
            disabled={loading}
            onClick={handleGenerate}
            sx={{
              mt: 2,
              py: 2,
              borderRadius: 4,
              fontSize: 18,
              fontWeight: 700,
            }}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "✨ Create Tonight's Story"
            )}
          </Button>
        </CardContent>
      </Card>

      {loading && <StoryLoading />}

      {story && !loading && (
        <Paper
          elevation={3}
          sx={{
            mt: 4,
            p: 4,
            borderRadius: 6,
            background: "linear-gradient(180deg,#FFFFFF,#FFFBEB)",
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" spacing={1} alignItems="center">
              <StarIcon color="warning" />

              <Typography variant="h5" fontWeight={900}>
                Tonight&apos;s Story
              </Typography>
            </Stack>

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

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              flexWrap="wrap"
            >
              <Button
                variant="outlined"
                startIcon={<FavoriteIcon />}
                onClick={() => saveFavoriteStory(currentStory)}
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
            </Stack>
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

export default StoriesPage;