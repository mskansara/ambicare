//Registration of Service Worker


/*Public Key:
BOCy7f8xG8tWYt6GhxLT5cj_U4FkogBHisnVZTOrUi03rUGOtYs-eFK86jQj9nS2fYCnBEaObdnBWsN59t2EhnU
Private Key:
AjBbQrMrFgHl5Z-Bvy__-4lYXI6rcohHLbhD2Hpp5_M

*/
//Check if sw are supported
const publicVapidKey = "BOCy7f8xG8tWYt6GhxLT5cj_U4FkogBHisnVZTOrUi03rUGOtYs-eFK86jQj9nS2fYCnBEaObdnBWsN59t2EhnU";
// Check for service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('../static/service-worker.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`));
    });

}

async function send() {
  
    console.log("Registering Push...");
    const subscription = await ServiceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log("Push Registered...");

    // Send Push Notification
  console.log("Sending Push...");
  await fetch("/driver/subscribe", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json"
    }
  });
  console.log("Push Sent...");

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