import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { askParentAssistant } from "../services/parentService";
import type { ChatMessage, Conversation } from "../types/chat";
import { getActiveChildProfile } from "../utils/childProfileStorage";

const CONVERSATIONS_KEY = "parentpal_conversations";

interface ChatContextValue {
  conversations: Conversation[];
  activeConversation: Conversation;
  activeConversationId: string;
  loading: boolean;
  error: string;
  createConversation: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (question: string) => Promise<void>;
  deleteConversation: (id: string) => void;
  deleteAllConversations: () => void;
  clearActiveConversation: () => void;
  
}

const ChatContext = createContext<ChatContextValue | null>(null);

const createEmptyConversation = (): Conversation => {
  const now = new Date().toISOString();
  const activeChild = getActiveChildProfile();

  return {
    id: crypto.randomUUID(),
    childId: activeChild?.id ?? "",
    title: "New Chat",
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
};

export function ChatProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(CONVERSATIONS_KEY);

    if (!saved) {
      return [createEmptyConversation()];
    }

    const parsed = JSON.parse(saved) as Conversation[];

    return parsed.length > 0 ? parsed : [createEmptyConversation()];
  });

  const [activeConversationId, setActiveConversationId] = useState<string>(() => {
    const saved = localStorage.getItem(CONVERSATIONS_KEY);

    if (!saved) {
      return "";
    }

    const parsed = JSON.parse(saved) as Conversation[];

    return parsed[0]?.id ?? "";
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const activeConversation =
    conversations.find((item) => item.id === activeConversationId) ??
    conversations[0];

  useEffect(() => {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));

    if (!activeConversationId && conversations.length > 0) {
      setActiveConversationId(conversations[0].id);
    }
  }, [conversations, activeConversationId]);

  const createConversation = () => {
    setError("");

    const newConversation = createEmptyConversation();

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const selectConversation = (id: string) => {
    setError("");
    setActiveConversationId(id);
  };

  const updateConversationMessages = (
    conversationId: string,
    messages: ChatMessage[]
  ) => {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              messages,
              updatedAt: new Date().toISOString(),
              title:
                conversation.title === "New Chat" && messages.length > 0
                  ? messages[0].text.slice(0, 40)
                  : conversation.title,
            }
          : conversation
      )
    );
  };

  const sendMessage = async (question: string) => {
    setError("");

    const activeChild = getActiveChildProfile();

    if (!activeConversation) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: question,
      createdAt: new Date().toISOString(),
    };

    const messagesWithUser = [
      ...activeConversation.messages,
      userMessage,
    ];

    updateConversationMessages(activeConversation.id, messagesWithUser);

    try {
      setLoading(true);

      const childAge = activeChild?.birthDate ? "Use child profile birthDate" : "Unknown";

      const response = await askParentAssistant({
        childAge,
        question,
        childProfile: activeChild,
      });

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: response.answer,
        createdAt: new Date().toISOString(),
      };

      updateConversationMessages(activeConversation.id, [
        ...messagesWithUser,
        assistantMessage,
      ]);
    } catch {
      setError("Unable to contact ParentPal AI.");
    } finally {
      setLoading(false);
    }
  };

  const clearActiveConversation = () => {
    if (!activeConversation) {
      return;
    }

    updateConversationMessages(activeConversation.id, []);
  };
  const deleteConversation = (id: string) => {
  const updated = conversations.filter((item) => item.id !== id);

  if (updated.length === 0) {
    const newConversation = createEmptyConversation();
    setConversations([newConversation]);
    setActiveConversationId(newConversation.id);
    return;
  }

  setConversations(updated);

  if (activeConversationId === id) {
    setActiveConversationId(updated[0].id);
  }
};

const deleteAllConversations = () => {
  const newConversation = createEmptyConversation();
  setConversations([newConversation]);
  setActiveConversationId(newConversation.id);
};
  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        activeConversationId,
        loading,
        error,
        createConversation,
        selectConversation,
        sendMessage,
        clearActiveConversation,
        deleteConversation,
        deleteAllConversations,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChatContext() {
  const context = useContext(ChatContext);

  if (!context) {
    throw new Error("useChatContext must be used inside ChatProvider");
  }

  return context;
}