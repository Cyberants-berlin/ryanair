import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
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

// Def. eine funktionale Komponente ML in React
const MainLayout: React.FC = () => (
  <>
    {/* // rendert eine Navigationsleiste 
    // und e. Platzhalter für untergeordnete Routen */}
    <Navbar />
    <Outlet />
  </>
);

function App() {
  // Nutzt Hook um Anmeldestatus & Status der Überprüfung zu kriegen
  const { isLoggedIn, checkingStatus } = useAuthStatus();

  // wird status noch geprüft?..
  if (checkingStatus) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* // Setzt Design-Thema f. App */}
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AuthProvider>
          <Router>
            <Routes>
              {/* def route f. registration */}
              <Route path="/register" element={<Registration />} />
              {/* Def. Route f. d. Login-Seite und leitet angemeldete Benutzer zur Hauptseite um. */}
              <Route
                path="/login"
                element={!isLoggedIn ? <Login /> : <Navigate to="/" replace />}
              />
              {/* Nutz MainLayout f.d. folgenden untergeordneten Routen. */}
              <Route element={<MainLayout />}>
                {/* def. Startseite */}
                <Route index element={<DestinationCitiesCard />} />
                <Route path="/:city" element={<DashboardPage />} />
                {/* def. Route f. Chat nur für angemeldete Benutzer */}
                <Route
                  path="/chatroom/:city"
                  element={
                    isLoggedIn ? <Chatroom /> : <Navigate to="/login" replace />
                  }
                />
                {/* ähnlich wie davor, f. allgemeine Chats */}
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
