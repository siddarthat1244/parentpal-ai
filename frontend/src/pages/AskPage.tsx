import { Card, CardContent, Typography } from "@mui/material";
import ParentForm from "../components/ParentForm";

function AskPage() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Ask ParentPal
        </Typography>

        <ParentForm />
      </CardContent>
    </Card>
  );
}

export default AskPage;