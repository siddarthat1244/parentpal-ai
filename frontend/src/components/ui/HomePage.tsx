import { Box, Grid, Typography } from "@mui/material";
import PageHeader from "../components/ui/PageHeader";
import HeroCard from "../components/ui/HeroCard";
import QuickActionCard from "../components/ui/QuickActionCard";
import StatCard from "../components/ui/StatCard";
import { useChildContext } from "../context/ChildContext";
import { getFavoriteStories } from "../utils/storyActions";
import { getAllChildProfiles } from "../utils/childProfileStorage";

function HomePage() {
  const { activeChild } = useChildContext();

  const favoriteCount = getFavoriteStories().length;
  const childCount = getAllChildProfiles().length;

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Your personalized parenting command center."
      />

      <HeroCard childName={activeChild?.name} />

      <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
        Quick Actions
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <QuickActionCard
            title="AI Chat"
            description="Ask parenting questions."
            icon="🤖"
            to="/ask"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <QuickActionCard
            title="Stories"
            description="Create bedtime stories."
            icon="📖"
            to="/stories"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <QuickActionCard
            title="Favorites"
            description="Read saved stories."
            icon="❤️"
            to="/favorite-stories"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <QuickActionCard
            title="Activities"
            description="Fun ideas coming soon."
            icon="🎨"
            to="/"
          />
        </Grid>
      </Grid>

      <Typography variant="h5" fontWeight={800} sx={{ mb: 2 }}>
        Today&apos;s Progress
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Favorite Stories" value={favoriteCount} icon="❤️" />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="Children Profiles" value={childCount} icon="👧" />
        </Grid>

        <Grid size={{ xs: 12, sm: 4 }}>
          <StatCard label="AI Tools" value="3" icon="✨" />
        </Grid>
      </Grid>
    </Box>
  );
}

export default HomePage;