import "./App.css";
import LoginButton from "./components/LoginButton";
import Profile from "./components/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import StockContent from "./components/StockContent";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ marginTop: "20px", marginLeft: "30px", fontSize: "30px", fontStyle: "italic" }}>
          Finan.Stock <i class="fas fa-chart-line"></i>
        </h1>
        <Profile />
      </div>
      <StockContent />
    </div>
  );
}

export default App;
