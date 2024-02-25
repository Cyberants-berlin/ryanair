
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
import { ThemeProvider } from "./components/Theme";
import { Toaster } from "./components/ui/toaster";
import "./main.css";
import DashboardPage from "./components/Dashboard";


const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  const { isLoggedIn, checkingStatus } = useAuthStatus();


  if (checkingStatus) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
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
                <Route path="/:city" element={<DashboardPage />} />
                <Route
                  path="/chatroom/:city"
                  element={
                    isLoggedIn ? <Chatroom /> : <Navigate to="/login" replace />
                  }
                />
                <Route
                  path="/chatroom"
                  element={
                    isLoggedIn ? (
                      <ProtectedRoute>
                        <Chatroom />
                      </ProtectedRoute>
                    ) : (
                      <Navigate to="/login" replace />
                    )
                  }
                />
              </Route>
            </Routes>
            <Toaster />
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}

export default App;