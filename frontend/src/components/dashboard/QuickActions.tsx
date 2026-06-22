import { Grid, Typography } from "@mui/material";
import QuickActionCard from "../ui/QuickActionCard";

function QuickActions() {
  return (
    <>
      <Typography variant="h5" fontWeight={900} sx={{ mb: 2 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <QuickActionCard title="AI Chat" description="Ask parenting questions." icon="🤖" to="/ask" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <QuickActionCard title="Stories" description="Create bedtime stories." icon="📖" to="/stories" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <QuickActionCard title="Library" description="Read saved stories." icon="❤️" to="/favorite-stories" />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <QuickActionCard title="Activities" description="Coming soon." icon="🎨" to="/" />
        </Grid>
      </Grid>
    </>
  );
}

export default QuickActions;