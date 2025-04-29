window.onload = function () {
  const data = [
    { label: "Groceries", value: 45 },
    { label: "Streaming", value: 15 },
    { label: "New Shoes", value: 75 },  // flagged
    { label: "Dining Out", value: 60 },
    { label: "Gaming", value: 85 }      // flagged
  ];

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
    const speed = 1;

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