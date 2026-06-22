import { Box, Card, CardContent, Typography } from "@mui/material";
import ParentForm from "../components/ParentForm";
import ConversationSidebar from "../components/chat/ConversationSidebar";
import { useChatContext } from "../context/ChatContext";

function AskPage() {
  const {
    conversations,
    activeConversationId,
    selectConversation,
    createConversation,
    deleteConversation,
    deleteAllConversations,
  } = useChatContext();

  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        AI Parenting Chat
      </Typography>

      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Ask questions about sleep, meals, behavior, activities, or daily parenting challenges.
      </Typography>

      <Card sx={{ borderRadius: 4, overflow: "hidden" }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ display: "flex", minHeight: 620 }}>
            <ConversationSidebar
              conversations={conversations}
              activeConversationId={activeConversationId}
              onConversationClick={selectConversation}
              onNewChat={createConversation}
              onDeleteConversation={deleteConversation}
              onDeleteAllConversations={deleteAllConversations}
            />

            <Box sx={{ flex: 1, p: 4 }}>
              <ParentForm />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AskPage;