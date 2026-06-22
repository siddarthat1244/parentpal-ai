import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

import { getContinueReading } from "../../utils/continueReading";

function ContinueReadingCard() {
  const story = getContinueReading();

  if (!story) return null;

  return (
    <Card
      sx={{
        mb: 4,
        borderRadius: 5,
        background:
          "linear-gradient(135deg,#FEF3C7,#FFFFFF)",
      }}
    >
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={800}
          gutterBottom
        >
          Continue Reading
        </Typography>

        <Box display="flex" gap={2} alignItems="center">
          <AutoStoriesIcon
            sx={{
              fontSize: 50,
              color: "#F59E0B",
            }}
          />

          <Box flex={1}>
            <Typography fontWeight={700}>
              {story.title}
            </Typography>

            <Typography color="text.secondary">
              {new Date(
                story.createdAt
              ).toLocaleDateString()}
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
          >
            Continue
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ContinueReadingCard;