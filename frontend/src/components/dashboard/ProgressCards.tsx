import { Grid, Typography } from "@mui/material";
import StatCard from "../ui/StatCard";

interface Props {
  favoriteCount: number;
  childCount: number;
}

function ProgressCards({ favoriteCount, childCount }: Props) {
  return (
    <>
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Today&apos;s Progress
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Favorites" value={favoriteCount} icon="❤️" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Children" value={childCount} icon="👧" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="AI Tools" value="3" icon="✨" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard label="Reading Time" value="35m" icon="⏱️" />
        </Grid>
      </Grid>
    </>
  );
}

export default ProgressCards;