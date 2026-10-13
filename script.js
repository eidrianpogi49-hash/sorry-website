const floatingHearts = document.querySelector('.floating-hearts');
const revealButton = document.getElementById('revealButton');
const secretMessage = document.getElementById('secretMessage');
const backgroundMusic = document.getElementById('backgroundMusic');
const musicFallbacks = document.querySelectorAll('.music-fallback');
const musicStartButtons = document.querySelectorAll('.music-start');
const introPage = document.getElementById('introPage');
const messagePage = document.getElementById('messagePage');
const readMessage = document.getElementById('readMessage');
const backToIntro = document.getElementById('backToIntro');

for (let i = 0; i < 18; i++) {
  const heart = document.createElement('span');
  heart.textContent = '♥';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.animationDelay = `${(Math.random() * 6).toFixed(2)}s`;
  heart.style.animationDuration = `${(10 + Math.random() * 8).toFixed(2)}s`;
  heart.style.setProperty('--x', `${(Math.random() * 180 - 90).toFixed(0)}px`);
  heart.style.fontSize = `${(0.9 + Math.random() * 1.6).toFixed(2)}rem`;
  floatingHearts.appendChild(heart);
}

if (revealButton && secretMessage) {
  revealButton.addEventListener('click', () => {
    secretMessage.classList.toggle('visible');
    revealButton.textContent = secretMessage.classList.contains('visible')
      ? 'I love you more than words'
      : 'Open my heart to you';
  });
}

if (backgroundMusic && musicFallbacks.length && musicStartButtons.length) {
  const showMusicFallback = () => {
    musicFallbacks.forEach((fallback) => {
      fallback.hidden = false;
    });
  };

  const startMusic = () => backgroundMusic.play()
    .then(() => {
      musicFallbacks.forEach((fallback) => {
        fallback.hidden = true;
      });
    })
    .catch(showMusicFallback);

  startMusic();

  musicStartButtons.forEach((button) => {
    button.addEventListener('click', startMusic);
  });
}

if (introPage && messagePage && readMessage && backToIntro) {
  const showPage = (page, updateHistory = true) => {
    const showMessage = page === 'message';
    introPage.hidden = showMessage;
    messagePage.hidden = !showMessage;
    messagePage.classList.remove('entering');

    if (showMessage) {
      void messagePage.offsetWidth;
      messagePage.classList.add('entering');
    }

    if (updateHistory) {
      history.pushState({ page }, '', showMessage ? '#message' : '#home');
    }

    window.scrollTo(0, 0);
    if (backgroundMusic?.paused) {
      backgroundMusic.play().catch(() => {});
    }
  };

  readMessage.addEventListener('click', (event) => {
    event.preventDefault();
    showPage('message');
  });

  backToIntro.addEventListener('click', (event) => {
    event.preventDefault();
    showPage('home');
  });

  window.addEventListener('popstate', () => {
    showPage(window.location.hash === '#message' ? 'message' : 'home', false);
  });

  if (window.location.hash === '#message') {
    showPage('message', false);
  }
}
