import { Box, CircularProgress, Stack, Typography, Chip } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BedtimeIcon from "@mui/icons-material/Bedtime";
import PaletteIcon from "@mui/icons-material/Palette";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import SchoolIcon from "@mui/icons-material/School";
import type { ChatMessage } from "../../types/chat";
import MessageBubble from "./MessageBubble";

interface Props {
  messages: ChatMessage[];
  loading: boolean;
}

function ChatWindow({ messages, loading }: Props) {
  const suggestions = [
    { label: "Healthy Meals", icon: <RestaurantIcon /> },
    { label: "Sleep", icon: <BedtimeIcon /> },
    { label: "Activities", icon: <PaletteIcon /> },
    { label: "Stories", icon: <AutoStoriesIcon /> },
    { label: "Learning", icon: <SchoolIcon /> },
  ];

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
        <Box textAlign="center" py={7}>
          <SmartToyIcon color="primary" sx={{ fontSize: 54, mb: 2 }} />

          <Typography variant="h5" fontWeight={700} gutterBottom>
            Welcome to ParentPal
          </Typography>

          <Typography color="text.secondary" sx={{ mb: 3 }}>
            I can help with everyday parenting questions.
          </Typography>

          <Stack
            direction="row"
            spacing={1}
            justifyContent="center"
            flexWrap="wrap"
            useFlexGap
          >
            {suggestions.map((item) => (
              <Chip
                key={item.label}
                icon={item.icon}
                label={item.label}
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>

          <Typography color="text.secondary" sx={{ mt: 3 }}>
            Type your first question below.
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