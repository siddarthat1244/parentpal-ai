import { Grid, Typography } from "@mui/material";
import SelectionCard from "../ui/SelectionCard";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const storyTypes = [
  {
    emoji: "✨",
    title: "Imagination",
    subtitle: "A creative fictional story",
  },
  {
    emoji: "🕉️",
    title: "Mythology",
    subtitle: "Ancient respectful retelling",
  },
  {
    emoji: "❤️",
    title: "Moral Story",
    subtitle: "Simple lesson-based story",
  },
];

function StoryTypeSelector({ value, onChange }: Props) {
  return (
    <>
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Choose Story Type
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {storyTypes.map((item) => (
          <Grid size={{ xs: 12, sm: 4 }} key={item.title}>
            <SelectionCard
              emoji={item.emoji}
              title={item.title}
              subtitle={item.subtitle}
              selected={value === item.title}
              onClick={() => onChange(item.title)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default StoryTypeSelector;