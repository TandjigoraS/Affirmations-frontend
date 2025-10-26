/* const API_BASE = "http://localhost:8080/api/affirmations";

export async function loginUser(username) {
  return { username }; // MVP
}

export async function getAffirmationByStyle(style) {
  const res = await fetch(`${API_BASE}/style/${style}`);
  return await res.json();
}

export async function saveAffirmation(username, affirmation) {
  await fetch(`${API_BASE}/user/${username}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(affirmation),
  });

  const key = `affirmations_${username}`;
  const current = JSON.parse(localStorage.getItem(key)) || [];
  const updated = [...current, affirmation];
  localStorage.setItem(key, JSON.stringify(updated));
}
 */

// Simule la récupération d'une affirmation par style
const affirmationsDB = {
  motivation: [
    { message: "Tu es capable de grandes choses !" },
    { message: "Chaque jour est une nouvelle opportunité." },
  ],
  confiance: [
    { message: "Crois en toi et en tes capacités." },
    { message: "Ta confiance attire le succès." },
  ],
  bienveillance: [
    { message: "Sois doux avec toi-même." },
    { message: "Ta gentillesse fait une différence." },
  ],
  énergie: [
    { message: "Lève-toi et brille !" },
    { message: "Ton énergie positive rayonne." },
  ],
  positivité: [
    { message: "Choisis la joie aujourd'hui." },
    { message: "La pensée positive attire le positif." },
  ],
};

// Récupère une affirmation aléatoire par style
export async function getAffirmationByStyle(style) {
  const list = affirmationsDB[style] || [];
  const index = Math.floor(Math.random() * list.length);
  return list[index];
}

// Sauvegarde l'affirmation dans localStorage
export async function saveAffirmation(username, affirmation) {
  const key = `affirmations_${username}`;
  const current = JSON.parse(localStorage.getItem(key)) || [];
  const updated = [...current, affirmation];
  localStorage.setItem(key, JSON.stringify(updated));
}
