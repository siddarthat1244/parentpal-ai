import { Card, CardContent, Typography } from "@mui/material";

interface ParentAnswerProps {
  answer: string;
}

function ParentAnswer({ answer }: ParentAnswerProps) {
  return (
    <Card variant="outlined" sx={{ mt: 2, backgroundColor: "#f8f7ff" }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          ParentPal Answer
        </Typography>
        <Typography>{answer}</Typography>
      </CardContent>
    </Card>
  );
}

export default ParentAnswer;