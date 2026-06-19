import api from "./api";

export interface ParentRequest {
  childAge: string;
  question: string;
}

export interface ParentResponse {
  answer: string;
}

export const askParentAssistant = async (
  request: ParentRequest
): Promise<ParentResponse> => {

  const response = await api.post<ParentResponse>(
    "/parent/ask",
    request
  );

  return response.data;
};