export interface AIProvider {
  generateParentAnswer(
    childAge: string,
    question: string,
    childProfile?: unknown
  ): Promise<string>;
}