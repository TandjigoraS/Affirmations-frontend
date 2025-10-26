import { useEffect, useState } from "react";

export default function History({ username, onGoToSettings }) {
  const [affirmations, setAffirmations] = useState([]);
  const [dailyMessage, setDailyMessage] = useState("");

  const loadHistory = () => {
    const stored = JSON.parse(localStorage.getItem(`affirmations_${username}`)) || [];
    setAffirmations(stored);
    setDailyMessage(stored.length > 0 ? stored[stored.length - 1].message : "");
  };

  // Charge l'historique au montage
  useEffect(() => {
    loadHistory();

    // Écoute les changements dans localStorage (si l'utilisateur ouvre plusieurs onglets)
    const handleStorageChange = (e) => {
      if (e.key === `affirmations_${username}`) {
        loadHistory();
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [username]);

  const hasSettings = affirmations.length > 0;

  return (
    <div className="history-container">
      <h2>Ton message du jour 💬</h2>

      <div className="history-affirmation-box">
        {hasSettings ? (
          dailyMessage
        ) : (
          <>
            <p>Tu n’as pas encore choisi de style d’affirmation 😌</p>
            <p>
              <strong>Configure ton style et ta fréquence</strong> pour recevoir des messages positifs 💫
            </p>
          </>
        )}
      </div>

      <h3>Historique de tes affirmations 📜</h3>
      {affirmations.length === 0 ? (
        <p>Aucune affirmation enregistrée pour le moment.</p>
      ) : (
        <ul className="history-list">
          {affirmations.map((a, index) => (
            <li key={index}>
              {a.message} <small>({a.style})</small>
            </li>
          ))}
        </ul>
      )}

      <button className="history-back-btn" onClick={onGoToSettings}>
        ⚙️ Paramétrer mes affirmations
      </button>
    </div>
  );
}
