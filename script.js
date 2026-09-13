const slides = Array.from(document.querySelectorAll('.slide'));
const dotsWrap = document.getElementById('dots');
const counter = document.getElementById('counter');
const progress = document.getElementById('progress');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fsBtn = document.getElementById('fsBtn');
let current = 0;

slides.forEach((_, i) => {
  const d = document.createElement('button');
  d.className = 'dot' + (i === 0 ? ' active' : '');
  d.setAttribute('aria-label', 'Slayd ' + (i+1));
  d.addEventListener('click', () => goTo(i));
  dotsWrap.appendChild(d);
});
const dots = Array.from(dotsWrap.children);
function pad(n){ return n < 10 ? '0'+n : ''+n; }

function goTo(i){
  if(i < 0 || i >= slides.length || i === current) return;
  slides[current].classList.remove('active');
  slides[current].classList.toggle('prev', i > current);
  slides[i].classList.remove('prev');
  slides[i].classList.add('active');
  dots[current].classList.remove('active');
  dots[i].classList.add('active');
  current = i;
  counter.textContent = pad(current+1) + ' / ' + pad(slides.length);
  progress.style.width = ((current+1)/slides.length*100) + '%';
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === slides.length - 1;
}

prevBtn.addEventListener('click', () => goTo(current-1));
nextBtn.addEventListener('click', () => goTo(current+1));
document.getElementById('tapLeft').addEventListener('click', () => goTo(current-1));
document.getElementById('tapRight').addEventListener('click', () => goTo(current+1));
prevBtn.disabled = true;

fsBtn.addEventListener('click', () => {
  if(!document.fullscreenElement){ document.documentElement.requestFullscreen().catch(()=>{}); }
  else{ document.exitFullscreen(); }
});

document.addEventListener('keydown', e => {
  if(e.key === 'ArrowRight' || e.key === ' ') goTo(current+1);
  if(e.key === 'ArrowLeft') goTo(current-1);
  if(e.key.toLowerCase() === 'f') fsBtn.click();
});

let touchX = null;
document.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; });
document.addEventListener('touchend', e => {
  if(touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if(dx > 60) goTo(current-1);
  if(dx < -60) goTo(current+1);
  touchX = null;
});

counter.textContent = pad(1) + ' / ' + pad(slides.length);