import type { ChildProfile } from "../types/parent";

const PROFILES_KEY = "parentpal_child_profiles";
const ACTIVE_CHILD_KEY = "parentpal_active_child_id";

export function getActiveChildProfile(): ChildProfile | null {
  const profiles = localStorage.getItem(PROFILES_KEY);
  const activeId = localStorage.getItem(ACTIVE_CHILD_KEY);

  if (!profiles || !activeId) {
    return null;
  }

  const children: ChildProfile[] = JSON.parse(profiles);

  return children.find((child) => child.id === activeId) ?? null;
}

export function getAllChildProfiles(): ChildProfile[] {
  const profiles = localStorage.getItem(PROFILES_KEY);
  return profiles ? JSON.parse(profiles) : [];
}

export function setActiveChildProfile(childId: string): void {
  localStorage.setItem(ACTIVE_CHILD_KEY, childId);
}