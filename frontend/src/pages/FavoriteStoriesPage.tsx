import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PrintIcon from "@mui/icons-material/Print";
import DownloadIcon from "@mui/icons-material/Download";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import StopIcon from "@mui/icons-material/Stop";
import {
  readStoryAloud,
  stopReadingAloud,
} from "../utils/readAloud";
import {
  deleteAllFavoriteStories,
  deleteFavoriteStory,
  downloadStoryAsPdf,
  getFavoriteStories,
  printStory,
  type SavedStory,
} from "../utils/storyActions";

function FavoriteStoriesPage() {
  const [stories, setStories] = useState<SavedStory[]>([]);

  useEffect(() => {
    setStories(getFavoriteStories());
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteFavoriteStory(id);
    setStories(updated);
  };

  const handleDeleteAll = () => {
    if (!window.confirm("Delete all favorite stories?")) {
      return;
    }

    deleteAllFavoriteStories();
    setStories([]);
  };

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mb: 1 }}
      >
        <Typography variant="h4" fontWeight={700}>
          Favorite Stories
        </Typography>

        {stories.length > 0 && (
          <Button
            color="error"
            variant="outlined"
            startIcon={<DeleteSweepIcon />}
            onClick={handleDeleteAll}
          >
            Delete All
          </Button>
        )}
      </Stack>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Your saved bedtime stories.
      </Typography>

      {stories.length === 0 ? (
        <Card sx={{ borderRadius: 4 }}>
          <CardContent sx={{ p: 4, textAlign: "center" }}>
            <FavoriteIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />

            <Typography variant="h6" fontWeight={700}>
              No favorite stories yet
            </Typography>

            <Typography color="text.secondary">
              Generate a story and click Save Favorite.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {stories.map((story) => (
            <Grid size={{ xs: 12, md: 6 }} key={story.id}>
              <Card sx={{ borderRadius: 4, height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" fontWeight={700}>
                    {story.title}
                  </Typography>

                  <Typography color="text.secondary" sx={{ mb: 2 }}>
                    {new Date(story.createdAt).toLocaleDateString()}
                  </Typography>

                  <Typography
                    sx={{
                      whiteSpace: "pre-line",
                      maxHeight: 180,
                      overflow: "hidden",
                      mb: 2,
                    }}
                  >
                    {story.story}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<VolumeUpIcon />}
                        onClick={() => readStoryAloud(story.story)}
                    >
                        Read Aloud
                    </Button>

                    <Button
                        size="small"
                        color="warning"
                        variant="outlined"
                        startIcon={<StopIcon />}
                        onClick={stopReadingAloud}
                    >
                        Stop
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<PrintIcon />}
                        onClick={printStory}
                    >
                        Print
                    </Button>

                    <Button
                        size="small"
                        variant="outlined"
                        startIcon={<DownloadIcon />}
                        onClick={() => downloadStoryAsPdf(story)}
                    >
                        PDF
                    </Button>

                    <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(story.id)}
                    >
                        Delete
                    </Button>
                                     
                </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

export default FavoriteStoriesPage;