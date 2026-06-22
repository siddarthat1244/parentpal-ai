import { Box, Grid, TextField, Typography } from "@mui/material";
import SelectionCard from "../ui/SelectionCard";

interface Props {
  value: string;
  customTheme: string;
  onChange: (value: string) => void;
  onCustomThemeChange: (value: string) => void;
}

const themes = [
  { emoji: "🚀", title: "Space", subtitle: "Rocket adventure" },
  { emoji: "🦄", title: "Unicorn", subtitle: "Magical friendship" },
  { emoji: "🦁", title: "Jungle", subtitle: "Animal adventure" },
  { emoji: "🏰", title: "Princess", subtitle: "Castle story" },
  { emoji: "🦖", title: "Dinosaurs", subtitle: "Prehistoric fun" },
  { emoji: "🌊", title: "Ocean", subtitle: "Underwater world" },
  { emoji: "✨", title: "Magic", subtitle: "Wonder and surprise" },
  { emoji: "➕", title: "Custom", subtitle: "Create your own theme" },
];

function ThemeSelector({
  value,
  customTheme,
  onChange,
  onCustomThemeChange,
}: Props) {
  const isCustom = value === "Custom";

  return (
    <>
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Choose a Theme
      </Typography>

      <Grid container spacing={2} sx={{ mb: isCustom ? 2 : 4 }}>
        {themes.map((theme) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={theme.title}>
            <SelectionCard
              emoji={theme.emoji}
              title={theme.title}
              subtitle={theme.subtitle}
              selected={value === theme.title}
              onClick={() => onChange(theme.title)}
            />
          </Grid>
        ))}
      </Grid>

      {isCustom && (
        <Box sx={{ mb: 4 }}>
          <TextField
            label="Enter Custom Theme"
            value={customTheme}
            onChange={(e) => onCustomThemeChange(e.target.value)}
            placeholder="Example: Hanuman and Rama friendship, Krishna story, Diwali, Frozen, Cars"
            fullWidth
          />
        </Box>
      )}
    </>
  );
}

export default ThemeSelector;