// Import necessary Firebase functions
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
import { app } from './firebase-config.js'; // Import the Firebase app instance

window.onload = function () {
  // Get a reference to the Firebase storage
  const storage = getStorage(app);

  // Function to fetch data from Firebase Storage
  async function fetchDataFromFirebase() {
    try {
      const dataRef = ref(storage, 'data.json'); // Path to your data file in Firebase Storage
      const url = await getDownloadURL(dataRef);
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data from Firebase:", error);
      return []; // Return an empty array or handle the error as needed
    }
  }

  const graphContainer = document.getElementById('graph');
  const flaggedContainer = document.getElementById('flagged');
  const spendingLimit = 60;

  const flagged = [];

  data.forEach(item => {
    const label = document.createElement('div');
    label.className = 'label';
    label.innerText = item.label;
    graphContainer.appendChild(label);

    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.innerText = '0%';
    graphContainer.appendChild(bar);

    let currentWidth = 0;
    const targetWidth = item.value;
    const speed = 20;

    const interval = setInterval(() => {
      if (currentWidth >= targetWidth) {
        clearInterval(interval);
        bar.innerText = targetWidth + '%';
      } else {
        currentWidth++;
        bar.style.width = currentWidth + '%';
        bar.innerText = currentWidth + '%';
      }
    }, speed);

    if (item.value > spendingLimit) {
      flagged.push(`${item.label} - $${item.value}`);
    }
  });

  if (flagged.length > 0) {
    const heading = document.createElement('div');
    heading.innerText = "⚠️ Irresponsible Purchases:";
    flaggedContainer.appendChild(heading);

    flagged.forEach(item => {
      const entry = document.createElement('div');
      entry.innerText = "• " + item;
      flaggedContainer.appendChild(entry);
    });
  }
};