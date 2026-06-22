import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import type { Conversation } from "../../types/chat";

interface Props {
  conversations: Conversation[];
  activeConversationId: string;
  onConversationClick: (id: string) => void;
  onNewChat: () => void;
  onDeleteConversation: (id: string) => void;
  onDeleteAllConversations: () => void;
}

function ConversationSidebar({
  conversations = [],
  activeConversationId,
  onConversationClick,
  onNewChat,
  onDeleteConversation,
  onDeleteAllConversations,
}: Props) {
  return (
    <Box
      sx={{
        width: 280,
        borderRight: "1px solid #E5E7EB",
        backgroundColor: "#F8FAFC",
      }}
    >
      <Box p={2}>
        <Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={onNewChat}>
          New Chat
        </Button>

        <Button
          fullWidth
          color="error"
          variant="outlined"
          sx={{ mt: 1 }}
          onClick={onDeleteAllConversations}
        >
          Delete All
        </Button>
      </Box>

      <Divider />

      <Box p={2}>
        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
          Recent Conversations
        </Typography>

        <List>
          {conversations.map((conversation) => (
            <Stack key={conversation.id} direction="row" alignItems="center">
              <ListItemButton
                selected={conversation.id === activeConversationId}
                onClick={() => onConversationClick(conversation.id)}
                sx={{ borderRadius: 2, mb: 1 }}
              >
                <ListItemText
                  primary={conversation.title}
                  secondary={new Date(conversation.updatedAt).toLocaleDateString()}
                />
              </ListItemButton>

              <IconButton
                color="error"
                onClick={() => onDeleteConversation(conversation.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Stack>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default ConversationSidebar;