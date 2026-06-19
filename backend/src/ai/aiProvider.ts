export interface AIProvider {
  generateParentAnswer(childAge: string, question: string): Promise<string>;
}