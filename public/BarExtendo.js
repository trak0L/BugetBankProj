window.onload = function () {
  const data = [
    { label: "Apples", value: 70 },
    { label: "Bananas", value: 40 },
    { label: "Cherries", value: 90 },
    { label: "Dates", value: 50 }
  ];

  const graphContainer = document.getElementById('graph');

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
    const speed = 5;

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
  });
};
