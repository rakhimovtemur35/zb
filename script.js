document.addEventListener('DOMContentLoaded', () => {
  let activeSlide = 1;
  const totalSlides = 8;

  // UI Elements
  const slides = document.querySelectorAll('.slide-page');
  const btnPrev = document.getElementById('btnPrev');
  const btnNext = document.getElementById('btnNext');
  const btnRestart = document.getElementById('btnRestart');
  const progressFill = document.getElementById('progressFill');
  const slideCurrent = document.getElementById('slideCurrent');
  const dotBox = document.getElementById('dotBox');

  let chartsLoaded = false;

  // Create Pagination Dots
  for (let i = 1; i <= totalSlides; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 1) dot.classList.add('active');
    dot.addEventListener('click', () => jumpToSlide(i));
    dotBox.appendChild(dot);
  }

  const dots = document.querySelectorAll('.dot');

  // Slide Switch Logic
  function updateDeckState() {
    slides.forEach(slide => {
      slide.classList.remove('active');
      if (parseInt(slide.dataset.index) === activeSlide) {
        slide.classList.add('active');
      }
    });

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === activeSlide);
    });

    slideCurrent.textContent = String(activeSlide).padStart(2, '0');
    progressFill.style.width = `${(activeSlide / totalSlides) * 100}%`;

    // Render Charts on First Load
    if (!chartsLoaded) {
      renderCharts();
      chartsLoaded = true;
    }
  }

  function jumpToSlide(index) {
    if (index >= 1 && index <= totalSlides) {
      activeSlide = index;
      updateDeckState();
    }
  }

  btnPrev.addEventListener('click', () => {
    if (activeSlide > 1) {
      activeSlide--;
      updateDeckState();
    }
  });

  btnNext.addEventListener('click', () => {
    if (activeSlide < totalSlides) {
      activeSlide++;
      updateDeckState();
    }
  });

  if (btnRestart) {
    btnRestart.addEventListener('click', () => jumpToSlide(1));
  }

  // Keyboard Navigation (Arrow Keys & Spacebar)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight' || e.key === 'Space') {
      if (activeSlide < totalSlides) {
        activeSlide++;
        updateDeckState();
      }
    } else if (e.key === 'ArrowLeft') {
      if (activeSlide > 1) {
        activeSlide--;
        updateDeckState();
      }
    }
  });

  // Touch Swipe Support (For Smartboards and Tablets)
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe Left -> Next Slide
      if (activeSlide < totalSlides) {
        activeSlide++;
        updateDeckState();
      }
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe Right -> Prev Slide
      if (activeSlide > 1) {
        activeSlide--;
        updateDeckState();
      }
    }
  }

  // Chart.js Visualizations Setup
  function renderCharts() {
    // Chart 1: Population Growth
    const ctxPop = document.getElementById('populationChart').getContext('2d');
    new Chart(ctxPop, {
      type: 'line',
      data: {
        labels: ['2023', '2024', '2025', '2026'],
        datasets: [{
          label: "Aholi Soni (Mln)",
          data: [36.0, 36.8, 37.8, 38.5],
          borderColor: '#06b6d4',
          backgroundColor: 'rgba(6, 182, 212, 0.15)',
          fill: true,
          tension: 0.3,
          borderWidth: 3
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#94a3b8' } } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });

    // Chart 2: Gender Ratio (Births)
    const ctxGender = document.getElementById('genderChart').getContext('2d');
    new Chart(ctxGender, {
      type: 'doughnut',
      data: {
        labels: ["O'g'il bolalar", "Qiz bolalar"],
        datasets: [{
          data: [51.7, 48.3],
          backgroundColor: ['#3b82f6', '#ec4899'],
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#94a3b8' } } }
      }
    });

    // Chart 3: Marriage vs Divorce
    const ctxMD = document.getElementById('marriageDivorceChart').getContext('2d');
    new Chart(ctxMD, {
      type: 'bar',
      data: {
        labels: ['2025 Yil (I Yarim)', '2026 Yil (I Yarim)'],
        datasets: [
          {
            label: 'Nikohlar (Mingta)',
            data: [95.3, 92.3],
            backgroundColor: '#10b981'
          },
          {
            label: 'Ajrashishlar (Mingta)',
            data: [23.3, 24.8],
            backgroundColor: '#ec4899'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#94a3b8' } } },
        scales: {
          x: { ticks: { color: '#94a3b8' }, grid: { display: false } },
          y: { ticks: { color: '#94a3b8' }, grid: { color: 'rgba(255,255,255,0.05)' } }
        }
      }
    });
  }
});