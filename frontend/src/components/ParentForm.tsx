import { useState } from "react";
import { Alert, Box, Button } from "@mui/material";
import ChatWindow from "./chat/ChatWindow";
import ChatInput from "./chat/ChatInput";
import ChildChatHeader from "./chat/ChildChatHeader";
import { useChatContext } from "../context/ChatContext";
import { getActiveChildProfile } from "../utils/childProfileStorage";

function ParentForm() {
  const [question, setQuestion] = useState("");

  const {
    activeConversation,
    loading,
    error,
    sendMessage,
    clearActiveConversation,
  } = useChatContext();

  const childProfile = getActiveChildProfile();

  const handleSend = async () => {
    const trimmedQuestion = question.trim();

    if (!trimmedQuestion) {
      return;
    }

    await sendMessage(trimmedQuestion);
    setQuestion("");
  };

  return (
    <Box>
      <ChildChatHeader childProfile={childProfile} />

      <ChatWindow
        messages={activeConversation?.messages ?? []}
        loading={loading}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {activeConversation?.messages.length > 0 && (
        <Button
          variant="outlined"
          color="secondary"
          onClick={clearActiveConversation}
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