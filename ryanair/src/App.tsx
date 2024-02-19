import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import DestinationCitiesCard from "./components/Cards";
import Navbar from "./components/Navbar";
import DetailComponent from "./components/Detail";
import Registration from "./components/Registration";
import { Login } from "./components/Login";
import { Chatroom } from "./components/Chatroom";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuthStatus } from "./components/AuthCardLogin"; 
import { Toaster } from "./components/ui/toaster";
import { useToast } from "./components/ui/use-toast";

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  const { isLoggedIn, checkingStatus } = useAuthStatus();
  const { toast } = useToast();
  console.log("isLoggedIn:", isLoggedIn, "checkingStatus:", checkingStatus);

  useEffect(() => {
    if (isLoggedIn) {
      toast({
        title: "Login in",
        description: "You've successfully logged in.",
        status: "success",
      });
    }
  }, [isLoggedIn, toast]);

  if (checkingStatus) {
    return <div>Loading...</div>;
  }

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route
            path="/login"
            element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
          />
          <Route element={<MainLayout />}>
            <Route index element={<DestinationCitiesCard />} />
            <Route path="/detail/:city" element={<DetailComponent />} />
            <Route
              path="/chatroom"
              element={
                <ProtectedRoute>
                  <Chatroom />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
}

export default App;