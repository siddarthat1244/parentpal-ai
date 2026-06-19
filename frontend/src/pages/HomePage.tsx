import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <Card>
      <CardContent>
        <Box textAlign="center" py={4}>
          <Typography variant="h3" gutterBottom>
            ParentPal AI
          </Typography>

          <Typography variant="h6" color="text.secondary" gutterBottom>
            Your AI parenting companion.
          </Typography>

          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/ask"
            sx={{ mt: 3 }}
          >
            Ask ParentPal
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default HomePage;