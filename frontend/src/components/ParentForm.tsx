import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Alert,
} from "@mui/material";
import { askParentAssistant } from "../services/parentService";
import ParentAnswer from "./ParentAnswer";

function ParentForm() {
  const [childAge, setChildAge] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAskAssistant = async () => {
    setError("");
    setAnswer("");

    if (!childAge.trim()) {
      setError("Please enter your child's age.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter your parenting question.");
      return;
    }

    try {
      setLoading(true);

      const response = await askParentAssistant({
        childAge,
        question,
      });

      setAnswer(response.answer);
    } catch {
      setError("Unable to reach ParentPal AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <TextField
        label="Child Age"
        value={childAge}
        onChange={(e) => setChildAge(e.target.value)}
        placeholder="Example: 4"
        fullWidth
      />

      <TextField
        label="Parent Question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Example: My child snores while sleeping. What should I do?"
        multiline
        minRows={4}
        fullWidth
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Button
        variant="contained"
        size="large"
        onClick={handleAskAssistant}
        disabled={loading}
      >
        {loading ? <CircularProgress size={24} color="inherit" /> : "Ask Assistant"}
      </Button>

      {answer && <ParentAnswer answer={answer} />}
    </Box>
  );
}

export default ParentForm;