import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import { Link } from "react-router-dom";

const features = [
  {
    title: "AI Chat",
    description: "Ask parenting questions and get instant guidance.",
    icon: <ChatIcon fontSize="large" />,
    path: "/ask",
  },
  {
    title: "Stories",
    description: "Create personalized bedtime stories for your child.",
    icon: <AutoStoriesIcon fontSize="large" />,
    path: "/stories",
  },
  {
    title: "Meal Planner",
    description: "Generate kid-friendly meals and grocery ideas.",
    icon: <RestaurantIcon fontSize="large" />,
    path: "/meal-planner",
  },
  {
    title: "Child Profile",
    description: "Save child details for personalized answers.",
    icon: <ChildCareIcon fontSize="large" />,
    path: "/child-profile",
  },
];

function HomePage() {
  return (
    <Box>
      <Card
        sx={{
          mb: 4,
          background: "linear-gradient(135deg, #4F46E5, #7C3AED)",
          color: "white",
          borderRadius: 4,
        }}
      >
        <CardContent sx={{ p: 5 }}>
          <Typography variant="h3" gutterBottom>
            Welcome to ParentPal AI
          </Typography>

          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 650 }}>
            Your AI parenting companion for everyday questions, stories,
            activities, meals, and child development support.
          </Typography>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/ask"
            sx={{ mt: 4, backgroundColor: "white", color: "#4F46E5" }}
          >
            Ask ParentPal
          </Button>
        </CardContent>
      </Card>

      <Typography variant="h5" fontWeight={700} gutterBottom>
        What would you like to do today?
      </Typography>

      <Grid container spacing={3}>
        {features.map((feature) => (
          <Grid size={{ xs: 12, sm: 6 }} key={feature.title}>
            <Card
              component={Link}
              to={feature.path}
              sx={{
                display: "block",
                height: "100%",
                textDecoration: "none",
                transition: "0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: 6,
                },
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Box color="primary.main">{feature.icon}</Box>

                  <Typography variant="h6" fontWeight={700}>
                    {feature.title}
                  </Typography>

                  <Typography color="text.secondary">
                    {feature.description}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;