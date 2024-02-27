// UserContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  User as FirebaseUser,
} from "firebase/auth";

//Def.Typschnittstelle mit Benutzerdaten und Funktionen für Login &Logout
interface UserContextType {
  user: FirebaseUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

//Typschnittstelle f. Eigenschaften des UserProvider
interface UserProviderProps {
  children: ReactNode;
}
//Erstellt Kontext f Benutzerdaten mit  undefinierten Standardwert
const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  // benutzt  benutzercontext innerhalb hook
  const context = useContext(UserContext);
  //Überprüft ob Kontext außerhalb eines UserProvider verw. wird
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  //def zustand f. benutzerdaten
  const [user, setUser] = useState<FirebaseUser | null>(null);
  //wird bei erster renderung der kompon. ausgeführt
  useEffect(() => {
    //regis. listener f. änderungen in authentif.status
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return () => unsubscribe(); // Clean up the subscription
  }, []);
  // Def. e. asynchrone Login-Funktion
  const login = async (email: string, password: string) => {
    //Führt d. Anmeldung mit E-Mail & Passwort durch
    await signInWithEmailAndPassword(auth, email, password);
  };
  // Def. e. asynchrone Logout-Funktion
  const logout = async () => {
    //führt abmeldung durch
    await auth.signOut();
  };

  return (
    //Stellt Kontext mit Benutzerdaten und Funktionen bereit
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
