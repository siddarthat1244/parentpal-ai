export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
}

export interface Conversation {
  id: string;

  // NEW
  childId: string;

  title: string;

  createdAt: string;

  updatedAt: string;

  messages: ChatMessage[];
}s