// client/src/utils/pushSubscription.js

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
};

// 🔥 use env variable instead of hardcoding
const API_URL = import.meta.env.VITE_API_URL;

export const subscribeUser = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    alert('Push messaging is not supported in this browser.');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    const existingSubscription =
      await registration.pushManager.getSubscription();

    if (existingSubscription) {
      return existingSubscription;
    }

    const publicKey = import.meta.env.VITE_VAPID_KEY;
    const uint8Key = urlBase64ToUint8Array(publicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: uint8Key
    });

    const response = await fetch(`${API_URL}/subscribe`, {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Failed to save subscription');

    return subscription;

  } catch (err) {
    console.error('Subscribe error:', err);
    alert(`Failed to subscribe user: ${err.message}`);
    return null;
  }
};

export const unsubscribeUser = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (!subscription) return true;

    // 🔥 Send to backend BEFORE unsubscribing
    await fetch(`${API_URL}/unsubscribe`, {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await subscription.unsubscribe();

    return true;

  } catch (error) {
    console.error('Unsubscribe error:', error);
    alert(`Unsubscribe failed: ${error.message}`);
    return false;
  }
};

export const getExistingSubscription = async () => {
  const registration = await navigator.serviceWorker.ready;
  return await registration.pushManager.getSubscription();
};