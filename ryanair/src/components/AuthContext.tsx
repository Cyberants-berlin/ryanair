// AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Adjust the path as necessary


interface AuthContextType {
  currentUser: User | null;
  loading : boolean;
}



const AuthContext = createContext<AuthContextType>({ 
  currentUser: null ,
  loading : true
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    },(error) => {
      console.error("Error in AuthProvider: ",error);
      setLoading(false);
    });


    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser ,loading }}>
      {!loading ?children : <div>Loading...</div>}
    </AuthContext.Provider>
  );
};
