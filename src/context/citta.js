import { createContext, useContext } from "react";

// Context e hook separati dal provider: vedi il commento in auth.js
export const CittaContext = createContext(null);

export function useCitta() {
  return useContext(CittaContext);
}
