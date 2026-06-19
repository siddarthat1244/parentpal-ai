export const generateParentAnswer = (
  childAge: string,
  question: string
): string => {
  return `For a ${childAge}-year-old child, here is a helpful starting point: ${question}. Watch for patterns, keep notes, and contact your pediatrician if symptoms continue or get worse.`;
};