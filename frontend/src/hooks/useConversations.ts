import { useEffect, useState } from "react";
import type { Conversation } from "../types/chat";

const CONVERSATIONS_KEY = "parentpal_conversations";

const createEmptyConversation = (): Conversation => {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    title: "New Chat",
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
};

export function useConversations() {
  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem(CONVERSATIONS_KEY);
    return saved ? JSON.parse(saved) : [createEmptyConversation()];
  });

  const [activeConversationId, setActiveConversationId] = useState<string>(
    conversations[0].id
  );

  useEffect(() => {
    localStorage.setItem(CONVERSATIONS_KEY, JSON.stringify(conversations));
  }, [conversations]);

  const activeConversation =
    conversations.find((c) => c.id === activeConversationId) ??
    conversations[0];

  const createConversation = () => {
    const newConversation = createEmptyConversation();

    setConversations((prev) => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  };

  const updateActiveConversationMessages = (
    messages: Conversation["messages"]
  ) => {
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === activeConversationId
          ? {
              ...conversation,
              messages,
              updatedAt: new Date().toISOString(),
              title:
                conversation.title === "New Chat" && messages.length > 0
                  ? messages[0].text.slice(0, 30)
                  : conversation.title,
            }
          : conversation
      )
    );
  };

  return {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    updateActiveConversationMessages,
  };
}