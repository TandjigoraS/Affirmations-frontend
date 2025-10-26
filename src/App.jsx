import { useState } from "react";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import History from "./components/History";
import "./index.css";

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState("history");

  if (!user) {
    return (
      <div className="app-container fade-in">
        <Login
          onLogin={(username) => {
            setUser(username);
            setView("history");
          }}
        />
      </div>
    );
  }

  return (
    <div className="app-container fade-in">
      {view === "dashboard" ? (
        <Dashboard username={user} onValidated={() => setView("history")} />
      ) : (
        <History username={user} onGoToSettings={() => setView("dashboard")} />
      )}
    </div>
  );
}
