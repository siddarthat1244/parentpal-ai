import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import type { ChatMessage } from "../../types/chat";
import MessageBubble from "./MessageBubble";

interface Props {
  messages: ChatMessage[];
  loading: boolean;
}

function ChatWindow({ messages, loading }: Props) {
  return (
    <Box
      sx={{
        minHeight: 420,
        maxHeight: 520,
        overflowY: "auto",
        p: 2,
        mb: 3,
        borderRadius: 3,
        backgroundColor: "#F8FAFC",
        border: "1px solid #E5E7EB",
      }}
    >
      {messages.length === 0 ? (
        <Box textAlign="center" py={8}>
          <SmartToyIcon color="primary" sx={{ fontSize: 48, mb: 2 }} />
          <Typography variant="h6" fontWeight={700}>
            Ask ParentPal anything
          </Typography>
          <Typography color="text.secondary">
            Try bedtime, food, tantrums, learning, or activities.
          </Typography>
        </Box>
      ) : (
        <Stack spacing={1}>
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
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
  );
}

export default ChatWindow;