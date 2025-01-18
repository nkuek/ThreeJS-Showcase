import { createContext, useContext, useState, useTransition } from "react";

type RouterContextState = {
  page: string;
  isTransitioning: boolean;
  navigate: (href: string) => void;
};

export const RouterContext = createContext<RouterContextState | null>(null);

export function useRouterContext() {
  const context = useContext(RouterContext);
  if (context === null) {
    throw new Error(
      "useRouterContext must be used within a RouterContextProvider"
    );
  }
  return context;
}