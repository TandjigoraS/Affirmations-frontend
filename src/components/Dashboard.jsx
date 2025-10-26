import { useState, useEffect } from "react";
import { getAffirmationByStyle, saveAffirmation } from "../api";

export default function Dashboard({ username, onValidated }) {
  const [style, setStyle] = useState("motivation");
  const [frequency, setFrequency] = useState("2");
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState("");

  const handleValidate = async () => {
    setLoading(true);
    setConfirmation("");

    try {
      const affirmation = await getAffirmationByStyle(style);
      await saveAffirmation(username, { ...affirmation, style });

      // planifier notification
      const intervalMs = parseInt(frequency, 10) * 24 * 60 * 60 * 1000;
      setTimeout(async () => {
        const newAff = await getAffirmationByStyle(style);
        new Notification("Affirmation positive 💫", { body: newAff.message });
        await saveAffirmation(username, { ...newAff, style });
      }, intervalMs);

      setConfirmation("✅ Affirmation enregistrée avec succès !");
      setTimeout(() => onValidated(), 1000);
    } catch (err) {
      setConfirmation("❌ Erreur lors de l’enregistrement.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="dashboard">
      <h2>Bienvenue {username} 👋</h2>
      <p>Choisis ton style et ta fréquence d’affirmations</p>

      <div className="settings">
        <label>Style d’affirmation :</label>
        <select value={style} onChange={(e) => setStyle(e.target.value)}>
          <option value="motivation">Motivation</option>
          <option value="confiance">Confiance</option>
          <option value="bienveillance">Bienveillance</option>
          <option value="énergie">Énergie</option>
          <option value="positivité">Positivité</option>
        </select>

        <label>Fréquence (en jours) :</label>
        <input
          type="number"
          min="1"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
        />

        <div className="buttons">
          <button onClick={handleValidate} disabled={loading}>
            {loading ? "Enregistrement..." : "Valider mes choix"}
          </button>
        </div>

        {confirmation && <p className="confirmation">{confirmation}</p>}
      </div>
    </div>
  );
}
