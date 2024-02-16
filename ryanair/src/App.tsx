import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import DestinationCitiesCard from "./components/Cards";
import Navbar from "./components/Navbar";
import DetailComponent from "./components/Detail";
import Registration from "./components/Registration";
import { Login } from "./components/Login";
import { Chatroom } from "./components/Chatroom";
import { AuthProvider } from "./components/AuthContext"; 
import ProtectedRoute from "./components/ProtectedRoute";

const MainLayout: React.FC = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  // const { currentUser } = useAuth(); 

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
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
      </Router>
    </AuthProvider>
  );
}

export default App;
