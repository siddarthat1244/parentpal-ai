import { useState } from "react";
import { Alert, Box, Button, TextField } from "@mui/material";
import ChatWindow from "./chat/ChatWindow";
import ChatInput from "./chat/ChatInput";
import { useChat } from "../hooks/useChat";

function ParentForm() {
  const [childAge, setChildAge] = useState("");
  const [question, setQuestion] = useState("");

  const { messages, loading, error, sendMessage, clearChat } = useChat();

  const handleSend = async () => {
    if (!childAge.trim()) {
      return;
    }

    if (!question.trim()) {
      return;
    }

    await sendMessage(childAge, question);
    setQuestion("");
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

      <ChatWindow messages={messages} loading={loading} />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {messages.length > 0 && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearChat}
          sx={{ mb: 2 }}
        >
          Clear Chat
        </Button>
      )}

      <ChatInput
        value={question}
        loading={loading}
        onChange={setQuestion}
        onSend={handleSend}
      />
    </Box>
  );
}

export default ParentForm;