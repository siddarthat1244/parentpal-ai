import api from "./api";
import type { ChildProfile } from "../types/parent";

export interface StoryRequest {
  theme: string;
  length: string;
  moral: string;
  storyType?: string;
  childProfile?: ChildProfile | null;
}

export interface StoryResponse {
  story: string;
}

export async function generateStory(
  request: StoryRequest
): Promise<StoryResponse> {
  const response = await api.post<StoryResponse>("/story/generate", request);
  return response.data;
}