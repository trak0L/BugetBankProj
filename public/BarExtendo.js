  // Import necessary Firebase functions
  import { getStorage, ref, listAll, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-storage.js";
  import { app } from './firebase-config.js'; // Import the Firebase app instance

window.onload = function () {
  const graphContainer = document.getElementById('graph');
  const flaggedContainer = document.getElementById('flagged');
  const spendingLimit = 60;
  const flagged = [];


  // Get a reference to the Firebase storage
  const storage = getStorage(app);
  const storageRef = ref(storage, 'json_uploads'); // Path to your JSON files

  // Function to fetch the most recently uploaded JSON file
  async function getMostRecentJsonFile() {
      try {
          const result = await listAll(storageRef);
          if (result.items.length === 0) {
              console.warn("No files found in json_uploads.");
              return null;
          }

          // Sort files by creation time (if available in metadata)
          // Or by name as a fallback (assuming a timestamp in filename)
          const sortedFiles = result.items.sort((a, b) => {
              // You might need to adjust this depending on how you store creation timestamps
              // If Firebase Storage metadata has 'timeCreated':
              // return b.metadata.timeCreated - a.metadata.timeCreated; 
              return b.name.localeCompare(a.name); // Sort by filename (most recent last)
          });

          const mostRecentFileRef = sortedFiles[0];
          return await getDownloadURL(mostRecentFileRef);

      } catch (error) {
          console.error("Error fetching or sorting files:", error);
          return null;
      }
  }

  // Function to fetch JSON data from URL
  async function fetchJsonData(url) {
      if (!url) return null;
      try {
          const response = await fetch(url);
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return await response.json();
      } catch (error) {
          console.error("Error fetching JSON data:", error);
          return null;
      }
  }

  // Main function to fetch and process data
  async function initialize() {
      const jsonUrl = await getMostRecentJsonFile();
      if (jsonUrl) {
          const data = await fetchJsonData(jsonUrl);
          if (data) {
              processDataAndDisplay(data);
          }
      } else {
          console.log("No JSON file to process.");
      }
  }

  function processDataAndDisplay(data) {
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
          heading.innerText = "Irresponsible Purchases:";
          flaggedContainer.appendChild(heading);

          flagged.forEach(item => {
              const entry = document.createElement('div');
              entry.innerText = "• " + item;
              flaggedContainer.appendChild(entry);
          });
      }
      // Make the data available globally
      window.purchaseData = data;
  }

  initialize();
};