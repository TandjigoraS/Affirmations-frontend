export function scheduleNotification(frequencyDays, callback) {
  const intervalMs = frequencyDays * 24 * 60 * 60 * 1000; // jours → ms

  console.log(`Notification planifiée toutes les ${frequencyDays} jours`);
  setInterval(callback, intervalMs);
}
