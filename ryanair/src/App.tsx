//  import  React  from  "react";
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

interface MainLayoutProps {
  children: ReactNode;
}

//  Update  MainLayout  to  use  the  MainLayoutProps  type
const MainLayout: React.FC<MainLayoutProps> = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />

        {/*  Nest  routes  under  MainLayout  */}
        <Route element={<MainLayout children={undefined} />}>
          <Route index element={<DestinationCitiesCard />} />
          <Route path="/detail/:city" element={<DetailComponent />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
