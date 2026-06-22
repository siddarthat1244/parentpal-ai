import { Avatar, Box, Paper, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import type { ChatMessage } from "../../types/chat";

interface Props {
  message: ChatMessage;
}

function MessageBubble({ message }: Props) {
  const isUser = message.role === "user";

  return (
    <Box
      display="flex"
      justifyContent={isUser ? "flex-end" : "flex-start"}
      mb={2}
    >
      <Box
        display="flex"
        flexDirection={isUser ? "row-reverse" : "row"}
        gap={1.5}
        maxWidth="80%"
      >
        <Avatar
          sx={{
            bgcolor: isUser ? "secondary.main" : "primary.main",
          }}
        >
          {isUser ? <PersonIcon /> : <SmartToyIcon />}
        </Avatar>

        <Paper
          elevation={2}
          sx={{
            p: 2,
            borderRadius: 3,
            bgcolor: isUser ? "primary.main" : "background.paper",
            color: isUser ? "white" : "text.primary",
          }}
        >
          <Typography>{message.text}</Typography>
        </Paper>
      </Box>
    </Box>
  );
}

export default MessageBubble;