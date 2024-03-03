import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth"; 
import { auth } from "../firebaseConfig"; 

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

//für die Authentifizierungsinfos initialisiert mit Standardwerten
const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {}, 
});
//useAuth der den AuthContext für einfachen Zugriff in anderen Komponenten nutzt
export const useAuth = () => useContext(AuthContext);
//das die Props für die AuthProvider-Komponente beschreibt
interface AuthProviderProps {
  children: React.ReactNode;
}
//AuthProviderKomponente die den Authentifizierungskontext bereitstell
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  //egistriert einen Beobachter für den Authentifizierungsstatusänder.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        // Aktualisiert currentUser und loading bei Änderungen
        setCurrentUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("Error in AuthProvider: ", error);
        setLoading(false);
      }
    );
    //Gibt  Funktion zurückt die den Beobachter abmelde wenn die Komponente unmontiert wird
    return unsubscribe;
  }, []);

  //logout-Funktion die den aktuellen Benutzer abmelde
  const logout = async () => {
    await signOut(auth);
  };

  //Stellt den AuthContext mit den aktuellen Werten von currentUser, loading und logout berei
  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {/* Zeigt entweder die children-Kompon. od. Ladeanzeige je nachdemob der Authentifizierungsprozess abgeschlossen is */}
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
