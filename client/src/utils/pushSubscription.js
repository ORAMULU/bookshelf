// client/src/utils/pushSubscription.js

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

export const subscribeUser = async () => {
  // 1. Check if the browser even supports push
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    alert('Push messaging is not supported in this browser.');
    return;
  }

  try {
    // 2. Wait for the service worker to be ready
    const registration = await navigator.serviceWorker.ready;

    // Check if a subscription already exists
    const existingSubscription = await registration.pushManager.getSubscription();

    if (existingSubscription) {
      alert('User already has an active subscription.');
      return true;
    }

    // 3. Prepare the Public Key
    // Replace this string with your actual Public Key from your backend .env
    const publicKey = 'BMJyZCHdIosCsg8aCFn8a5uSz4uBOw8VZNjcxzwySfVjtbs5WEn4dt6vxb1IHjP-yRz4dqcXaQLjTSG5UVquQfk';
    const uint8Key = urlBase64ToUint8Array(publicKey);

    // 4. Ask the browser to subscribe
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: uint8Key
    });

    // 5. Send subscription to your Node.js backend
    // Since they are separate, use the full URL of your backend (e.g., localhost:5000)
    const response = await fetch('http://localhost:5000/subscribe', {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      alert('User is subscribed and saved to backend.');
      return true;
    }
  } catch (err) {
    alert('Failed to subscribe user: ', err);
    return false;
  }
};