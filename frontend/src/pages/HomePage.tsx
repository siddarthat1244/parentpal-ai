import { Box } from "@mui/material";
import PageHeader from "../components/ui/PageHeader";
import HeroBanner from "../components/dashboard/HeroBanner";
import QuickActions from "../components/dashboard/QuickActions";
import ProgressCards from "../components/dashboard/ProgressCards";
import { useChildContext } from "../context/ChildContext";
import { getFavoriteStories } from "../utils/storyActions";
import { getAllChildProfiles } from "../utils/childProfileStorage";
import ContinueReadingCard from "../components/dashboard/ContinueReadingCard";

function HomePage() {
  const { activeChild } = useChildContext();

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Your personalized parenting command center."
      />

      <HeroBanner childName={activeChild?.name} />
      <ContinueReadingCard />
      <QuickActions />

      <ProgressCards
        favoriteCount={getFavoriteStories().length}
        childCount={getAllChildProfiles().length}
      />
    </Box>
  );
}

export default HomePage;