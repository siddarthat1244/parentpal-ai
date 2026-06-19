import { Box, Card, CardContent, Typography } from "@mui/material";
import ParentForm from "../components/ParentForm";

function AskPage() {
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        AI Parenting Chat
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Ask questions about sleep, meals, behavior, activities, or daily parenting challenges.
      </Typography>

      <Card sx={{ borderRadius: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <ParentForm />
        </CardContent>
      </Card>
    </Box>
  );
}

export default AskPage;