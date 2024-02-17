const publicVapidKey =
  "BFoJA2OEzKYJU8gSHmuLIXCH2dQQwUmo1SthcDJuQF3FT9VVjClBdsRovB4yoY5NFxISIQNKLNyAY0Lh84LXJs4";

if ("serviceWorker" in navigator) {
  send().catch(err => console.error(err));
}

async function send() {
  const register = await navigator.serviceWorker.register("/worker.js", {
    scope: "/"
  });

  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
  });

  // Send Push Notification
  await fetch("/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Notification Sent by CosmoFeed");
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}