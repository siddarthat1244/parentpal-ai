import { createContext, useContext, useEffect, useState } from "react";
import type { ChildProfile } from "../types/parent";
import {
  getAllChildProfiles,
  getActiveChildProfile,
  setActiveChildProfile,
} from "../utils/childProfileStorage";

interface ChildContextValue {
  children: ChildProfile[];
  activeChild: ChildProfile | null;
  changeChild: (id: string) => void;
  refreshChildren: () => void;
}

const ChildContext = createContext<ChildContextValue | null>(null);

export function ChildProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profiles, setProfiles] = useState<ChildProfile[]>([]);
  const [activeChild, setActiveChild] =
    useState<ChildProfile | null>(null);

  const refreshChildren = () => {
    setProfiles(getAllChildProfiles());
    setActiveChild(getActiveChildProfile());
  };

  useEffect(() => {
    refreshChildren();
  }, []);

  const changeChild = (id: string) => {
    setActiveChildProfile(id);
    refreshChildren();
  };

  return (
    <ChildContext.Provider
      value={{
        children: profiles,
        activeChild,
        changeChild,
        refreshChildren,
      }}
    >
      {children}
    </ChildContext.Provider>
  );
}

export function useChildContext() {
  const context = useContext(ChildContext);

  if (!context) {
    throw new Error(
      "useChildContext must be used inside ChildProvider"
    );
  }

  return context;
}