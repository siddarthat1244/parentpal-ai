import { Box, Grid, TextField, Typography } from "@mui/material";
import SelectionCard from "../ui/SelectionCard";
import { STORY_COLLECTIONS } from "../../data/storyCollections";

interface Props {
  collectionId: string;
  value: string;
  customTheme: string;
  onChange: (value: string) => void;
  onCustomThemeChange: (value: string) => void;
}

function StorySelector({
  collectionId,
  value,
  customTheme,
  onChange,
  onCustomThemeChange,
}: Props) {
  const collection = STORY_COLLECTIONS.find((item) => item.id === collectionId);

  if (!collection) return null;

  const isCustom = value === "Custom";

  return (
    <>
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Choose Story
      </Typography>

      <Grid container spacing={2} sx={{ mb: isCustom ? 2 : 4 }}>
        {collection.stories.map((story) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={story.id}>
            <SelectionCard
              emoji={story.emoji}
              title={story.title}
              subtitle={story.description}
              selected={value === story.title}
              onClick={() => onChange(story.title)}
            />
          </Grid>
        ))}
      </Grid>

      {isCustom && (
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Enter Custom Story Theme"
            value={customTheme}
            onChange={(e) => onCustomThemeChange(e.target.value)}
            placeholder="Example: Hanuman and Rama friendship, Krishna and Sudama, Diwali story"
            fullWidth
          />
        </Box>
      )}
    </>
  );
}

export default StorySelector;