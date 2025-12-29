window.addEventListener("load", () => {
  document.querySelectorAll('.bar > i').forEach(el => {
    const w = el.style.width || '60%';
    el.style.width = '0%';
    setTimeout(() => el.style.width = w, 100);
  });
});

const scrollSound = new Audio('assets/scroll.mp3');
const clickSound = new Audio('assets/click.mp3');

scrollSound.volume = 0.35;
clickSound.volume = 0.45;

document.addEventListener('click', e => {
  const card = e.target.closest('.project-card');
  if(card) clickSound.play().catch(()=>{});
});

let scrollTimeout=false;
window.addEventListener('scroll',()=>{
  if(!scrollTimeout){
    scrollSound.play().catch(()=>{});
    scrollTimeout=true;
    setTimeout(()=>scrollTimeout=false,400);
  }
});
