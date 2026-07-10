import { createContext, useContext } from "react";

// Context e hook stanno qui, il provider in AuthProvider.jsx: un file che esporta
// sia componenti sia funzioni romperebbe l'hot reload di Vite (regola react-refresh).
export const AuthContext = createContext(null);

// Scorciatoia per i componenti: const { utente, login, logout } = useAuth()
export function useAuth() {
  return useContext(AuthContext);
}
