import { useEffect, useState } from "react";
import { askParentAssistant } from "../services/parentService";
import type { ChatMessage } from "../types/chat";
import type { ChildProfile } from "../types/parent";

const CHAT_STORAGE_KEY = "parentpal_chat_messages";

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem(CHAT_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    localStorage.setItem(
      CHAT_STORAGE_KEY,
      JSON.stringify(messages)
    );
  }, [messages]);

  const getChildProfile = (): ChildProfile | null => {
    const saved = localStorage.getItem(
      "parentpal_child_profile"
    );

    return saved ? JSON.parse(saved) : null;
  };

  const sendMessage = async (
    childAge: string,
    question: string
  ) => {
    setError("");

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      text: question,
      createdAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMessage]);

    try {
      setLoading(true);

      const response = await askParentAssistant({
        childAge,
        question,
        childProfile: getChildProfile(),
      });

      const aiMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        text: response.answer,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, aiMessage]);

    } catch {
      setError("Unable to contact ParentPal AI.");
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem(CHAT_STORAGE_KEY);
  };

  return {
    messages,
    loading,
    error,
    sendMessage,
    clearChat,
  };
}