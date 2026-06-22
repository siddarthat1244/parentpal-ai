import { Grid, Typography } from "@mui/material";
import SelectionCard from "../ui/SelectionCard";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const lengths = [
  { emoji: "🟢", title: "Short", subtitle: "2 minutes" },
  { emoji: "🟡", title: "Medium", subtitle: "5 minutes" },
  { emoji: "🟣", title: "Long", subtitle: "8 minutes" },
];

function LengthSelector({ value, onChange }: Props) {
  return (
    <>
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Choose Length
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {lengths.map((item) => (
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

export default LengthSelector;