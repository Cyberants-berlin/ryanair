/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { ReactNode } from "react";
import { AuthProvider } from "./components/AuthContext";
import { DataProvider } from "./components/ui/DataContext"; 
import { Chatroom } from "./components/Chatroom";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        {" "}
        <Router>
          <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chatroom" element={<Chatroom />} />

            <Route element={<MainLayout children={undefined} />}>
              <Route index element={<DestinationCitiesCard />} />
              <Route path="/detail/:city" element={<DetailComponent />} />
              <Route path="/chatroom" element={<Chatroom />} />{" "}
              
              <Route path="*" element={<h1>Not Found</h1>} />
            </Route>
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
