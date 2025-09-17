// Konfigurasi Firebase (ganti dengan milikmu)
const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "PROJECT_ID.firebaseapp.com",
  projectId: "PROJECT_ID",
  storageBucket: "PROJECT_ID.appspot.com",
  messagingSenderId: "SENDER_ID",
  appId: "APP_ID"
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const db = firebase.firestore();

function uploadImages() {
  const files = document.getElementById('upload').files;
  Array.from(files).forEach(file => {
    const storageRef = storage.ref('images/' + file.name);
    storageRef.put(file).then(() => {
      storageRef.getDownloadURL().then(url => {
        db.collection('images').add({url}).then(() => {
          displayImages();
        });
      });
    });
  });
}

function displayImages() {
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = '';
  db.collection('images').get().then(snapshot => {
    snapshot.forEach(doc => {
      const img = document.createElement('img');
      img.src = doc.data().url;
      gallery.appendChild(img);
    });
  });
}

// Tampilkan foto saat halaman dibuka
displayImages();