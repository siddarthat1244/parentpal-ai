import { useEffect, useState } from "react";
import type { ChildProfile } from "../types/parent";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  TextField,
  Alert,
  Typography,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { askParentAssistant } from "../services/parentService";

interface ChatMessage {
  role: "user" | "assistant";
  text: string;
}

function ParentForm() {
  const CHAT_STORAGE_KEY = "parentpal_chat_messages";
  const [childAge, setChildAge] = useState("");
  const [question, setQuestion] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
  const savedMessages = localStorage.getItem(CHAT_STORAGE_KEY);
  return savedMessages ? JSON.parse(savedMessages) : [];
});
  const getChildProfile = (): ChildProfile | null => {
    const savedProfile = localStorage.getItem("parentpal_child_profile");

    if (!savedProfile) {
      return null;
    }

    return JSON.parse(savedProfile) as ChildProfile;
    };
  useEffect(() => {
    localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);
  const handleAskAssistant = async () => {
    setError("");

    if (!childAge.trim()) {
      setError("Please enter your child's age.");
      return;
    }

    if (!question.trim()) {
      setError("Please enter your parenting question.");
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      text: question,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");

    try {
      setLoading(true);

      const response = await askParentAssistant({
      childAge,
      question,
      childProfile: getChildProfile(),
    });

      const assistantMessage: ChatMessage = {
        role: "assistant",
        text: response.answer,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setError("Unable to reach ParentPal AI. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <TextField
        label="Child Age"
        value={childAge}
        onChange={(e) => setChildAge(e.target.value)}
        placeholder="Example: 4"
        fullWidth
        sx={{ mb: 3, maxWidth: 220 }}
      />

      <Box
        sx={{
          minHeight: 360,
          maxHeight: 460,
          overflowY: "auto",
          p: 2,
          mb: 3,
          borderRadius: 3,
          backgroundColor: "#F8FAFC",
          border: "1px solid #E5E7EB",
        }}
        > {messages.length > 0 && (
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setMessages([])}
            sx={{ mb: 2 }}
          >
            Clear Chat
          </Button>
        )}
        {messages.length === 0 ? (
          <Box textAlign="center" py={8}>
            <SmartToyIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" fontWeight={700}>
              Ask ParentPal anything
            </Typography>
            <Typography color="text.secondary">
              Try asking about bedtime, picky eating, tantrums, learning, or activities.
            </Typography>
          </Box>
        ) : (
          <Stack spacing={2}>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent:
                    message.role === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1.5}
                  alignItems="flex-start"
                  sx={{
                    maxWidth: "80%",
                    flexDirection:
                      message.role === "user" ? "row-reverse" : "row",
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor:
                        message.role === "user" ? "secondary.main" : "primary.main",
                    }}
                  >
                    {message.role === "user" ? <PersonIcon /> : <SmartToyIcon />}
                  </Avatar>

                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 3,
                      backgroundColor:
                        message.role === "user" ? "primary.main" : "white",
                      color: message.role === "user" ? "white" : "text.primary",
                      boxShadow: 1,
                    }}
                  >
                    <Typography>{message.text}</Typography>
                  </Box>
                </Stack>
              </Box>
            ))}

            {loading && (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={20} />
                <Typography color="text.secondary">
                  ParentPal is thinking...
                </Typography>
              </Box>
            )}
          </Stack>
        )}
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <TextField
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your parenting question..."
          fullWidth
          multiline
          maxRows={4}
        />

        <Button
          variant="contained"
          size="large"
          endIcon={<SendIcon />}
          onClick={handleAskAssistant}
          disabled={loading}
          sx={{ minWidth: 140 }}
        >
          Send
        </Button>
      </Stack>
    </Box>
  );
}

export default ParentForm;