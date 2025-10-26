import { useState } from "react";

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) onLogin(username);
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Entre ton nom d'utilisateur"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
