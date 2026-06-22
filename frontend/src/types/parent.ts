export interface ChildProfile {
  id: string;
  name: string;
  birthDate: string;
  gender: string;
  readingLevel: string;
  allergies: string;
  notes: string;
  interests: string[];
}

export interface ParentRequest {
  childAge: string;
  question: string;
  childProfile?: ChildProfile | null;
}

export interface ParentResponse {
  answer: string;
}