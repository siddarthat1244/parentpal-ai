import { Grid, Typography } from "@mui/material";
import SelectionCard from "../ui/SelectionCard";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const morals = [
  { emoji: "❤️", title: "Kindness" },
  { emoji: "🤝", title: "Sharing" },
  { emoji: "💪", title: "Courage" },
  { emoji: "😊", title: "Honesty" },
  { emoji: "🌱", title: "Respect" },
  { emoji: "🙏", title: "Gratitude" },
];

function MoralSelector({ value, onChange }: Props) {
  return (
    <>
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Choose a Lesson
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {morals.map((item) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={item.title}>
            <SelectionCard
              emoji={item.emoji}
              title={item.title}
              selected={value === item.title}
              onClick={() => onChange(item.title)}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default MoralSelector;