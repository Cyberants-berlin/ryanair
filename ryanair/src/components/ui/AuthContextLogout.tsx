import { useAuth } from "./components/AuthContext"; 

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Abmelden</button>;
};
