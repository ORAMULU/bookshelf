// public/sw.js
self.addEventListener('push', (event) => {
  let data = { title: 'New Alert', body: 'You have a library notification!' };
  
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body,
    icon: '/logo192.png', 
    badge: '/badge-icon.png', // Small icon for mobile status bars
    color: '#8b4513',
    vibrate: [1000, 50, 1000],
    data: {
      url: data.url || '/books'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
