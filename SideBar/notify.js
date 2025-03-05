function showNotification(title, message) {
    if (Notification.permission === 'granted') {
      navigator.serviceWorker.getRegistration().then((registration) => {
        registration.showNotification(title, {
          body: message,
          icon: 'icon-192x192.png',
          badge: 'icon-192x192.png',
        });
      });
    }
  }
  
  function requestNotificationPermission() {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        console.log('Notification permission granted.');
      } else {
        console.log('Notification permission denied.');
      }
    });
  }