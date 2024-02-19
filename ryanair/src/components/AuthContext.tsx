import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, signOut, User } from "firebase/auth"; 
import { auth } from "../firebaseConfig"; 

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  logout: async () => {}, 
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
      },
      (error) => {
        console.error("Error in AuthProvider: ", error);
        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, logout }}>
      {!loading ? children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
