import "./style.css";
import { useAuth0 } from "@auth0/auth0-react";
import Dashboard from "./Dashboard";
import Welcome from "./Welcome";

export default function Home() {
  const { isAuthenticated } = useAuth0();
  return (
   <>
    {isAuthenticated ? 
      <Dashboard /> :
      <Welcome />  
    }
   </>
  );
}
