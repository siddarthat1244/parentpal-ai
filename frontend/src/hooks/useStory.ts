import { useState } from "react";
import { generateStory } from "../services/storyService";
import { getActiveChildProfile } from "../utils/childProfileStorage";

export function useStory() {
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const createStory = async (
    theme: string,
    length: string,
    moral: string,
    storyType: string
  ) => {
    setError("");
    setStory("");

    try {
      setLoading(true);

      const response = await generateStory({
        theme,
        length,
        moral,
        storyType,
        childProfile: getActiveChildProfile(),
      });

      setStory(response.story);
    } catch {
      setError("Unable to generate story. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return {
    story,
    loading,
    error,
    createStory,
  };
}