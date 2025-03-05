const firebaseConfig = {
    apiKey: "AIzaSyBTwxsoj7-kvOL9xTjAQ6TRsg02Dq3QfEo",
    authDomain: "is-b31a6.firebaseapp.com",
    projectId: "is-b31a6",
    storageBucket: "is-b31a6.firebasestorage.app",
    messagingSenderId: "220488523420",
    appId: "1:220488523420:web:3d2391e1d57c7a9db39759",
  };
  
  firebase.initializeApp(firebaseConfig);
  
  var filetext = document.querySelector('.filetext');
  var uploadPercentage = document.querySelector('.uploadPercentage');
  var progress = document.querySelector('.progress');
  var percentVal;
  var fileItem;
  var fileName;
  var img = document.querySelector('.img');
  
  function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    filetext.innerHTML = fileName;
  }
  
  function uploadFile(e) {
    let storageRef = firebase.storage().ref('files/' + fileName);
    let uploadTask = storageRef.put(fileItem);
  
    uploadTask.on('state_changed', function(snapshot){
      console.log(snapshot);
      percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      console.log(percentVal);
      uploadPercentage.innerHTML = percentVal+"%";
      progress.style.width=percentVal+"%";
    }, (error) => {
      console.error('Error uploading file:', error);
      showNotification('Error', 'Error uploading file: ' + error.message);
    }, () => {
      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log('File uploaded successfully:', url);
        showNotification('Success', 'File uploaded successfully!');
        img.src = url;
        img.style.display = "block";
      }).catch((error) => {
        console.error('Error getting download URL:', error);
        showNotification('Error', 'Error getting download URL: ' + error.message);
      });
    });
  }
  
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

    // Function to go back to the previous page
    window.goBack = function() {
      window.history.back(); // Go back to the previous page
  }
  
  requestNotificationPermission();