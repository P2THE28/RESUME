window.addEventListener("load", () => {
  document.querySelectorAll('.bar > i').forEach(el => {
    const w = el.style.width || '60%';
    el.style.width = '0%';
    setTimeout(() => el.style.width = w, 100);
  });
});

// Respect reduced motion preferences
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Theme handling (persisted)
const root = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if(savedTheme === 'dark') root.classList.add('theme-dark');

const themeToggle = document.getElementById('themeToggle');
if(themeToggle){
  themeToggle.addEventListener('click', () => {
    const isDark = root.classList.toggle('theme-dark');
    themeToggle.setAttribute('aria-pressed', String(isDark));
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
}

// Entrance animations (skip if reduced motion)
window.addEventListener('load', () => {
  if(!prefersReduced){
    document.querySelectorAll('.container, .header-inner, .project-card, .skill-card, .card').forEach((el, i) => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(8px)';
      setTimeout(()=>{
        el.style.transition = 'opacity .45s ease, transform .45s ease';
        el.style.opacity = 1;
        el.style.transform = 'none';
      }, 120 + i*60);
    });
  }
});

// Audio is optional; don't auto-play — only on explicit interactions
let audioEnabled = !prefersReduced;
try{
  const scrollSound = new Audio('assets/scroll.mp3');
  const clickSound = new Audio('assets/click.mp3');
  scrollSound.volume = 0.35; clickSound.volume = 0.45;

  document.addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if(card && audioEnabled) clickSound.play().catch(()=>{});
  });

  let scrollTimeout=false;
  window.addEventListener('scroll',()=>{
    if(!audioEnabled) return;
    if(!scrollTimeout){
      scrollSound.play().catch(()=>{});
      scrollTimeout=true;
      setTimeout(()=>scrollTimeout=false,400);
    }
  });
}catch(err){
  // audio files missing or blocked — silently ignore
}

// Project modal interactions
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');
const modalMediaImg = document.querySelector('.modal-media img');

function openModal(card){
  if(!modal) return;
  const title = card.dataset.title || '';
  const desc = card.dataset.desc || '';
  const link = card.dataset.link || '';
  const img = card.querySelector('.project-media img')?.src || '';
  modalTitle.textContent = title;
  modalDesc.textContent = desc;
  modalLink.href = link || '#';
  if(modalMediaImg) modalMediaImg.src = img;
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  // move focus into modal
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn?.focus();
}

function closeModal(){
  if(!modal) return;
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

document.addEventListener('click', e => {
  const view = e.target.closest('.view-project');
  if(view){
    const card = view.closest('.project-card');
    openModal(card);
  }
  if(e.target.closest && e.target.closest('.modal-close')) closeModal();
  if(e.target.classList && e.target.classList.contains('modal-backdrop')) closeModal();
});

document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeModal();
});

// Allow Enter key to open focused project card
document.addEventListener('keydown', e => {
  if(e.key === 'Enter' && document.activeElement?.classList?.contains('project-card')){
    openModal(document.activeElement);
  }
});
