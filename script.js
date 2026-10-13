const floatingHearts = document.querySelector('.floating-hearts');
const revealButton = document.getElementById('revealButton');
const secretMessage = document.getElementById('secretMessage');

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
