window.addEventListener("load", () => {
  document.querySelectorAll('.bar > i').forEach(el => {
    const w = el.style.width || '60%';
    el.style.width = '0%';
    setTimeout(() => el.style.width = w, 100);
  });
});

// Respect reduced motion preferences
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Entrance animations
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


// Project modal interactions
const projectModal = document.getElementById('projectModal');
const modalTitle =document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalLink = document.getElementById('modalLink');
const modalMediaImg = document.querySelector('.modal-media img');

function openModal(card){
  if(!projectModal) return;
  modalTitle.textContent = card.dataset.title || '';
  modalDesc.textContent = card.dataset.desc || '';
  modalLink.href = card.dataset.link || '#';
  modalMediaImg && (modalMediaImg.src = card.querySelector('.project-media img')?.src || '');
  projectModal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
  projectModal.querySelector('.modal-close')?.focus();
}

function closeModal(){
  if(!projectModal) return;
  projectModal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

document.addEventListener('click', e => {
  const view = e.target.closest('.view-project');
  if(view) openModal(view.closest('.project-card'));
  if(e.target.closest?.('.modal-close') || e.target.classList?.contains('modal-backdrop')) closeModal();
});

document.addEventListener('keydown', e => {
  if(e.key === 'Escape') closeModal();
});


//===========project certificate=======//

const certBtns = document.querySelectorAll(".participation-certificate");
const certModal = document.getElementById("pdfModal");
const frame = document.getElementById("pdfFrame");
const certclose = document.querySelector(".close-certificate");

// sab buttons pe loop
certBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const pdfPath = btn.getAttribute("data-pdf"); // yaha se PDF aayega
    frame.src = pdfPath;
    certModal.style.display = "block";
    document.body.classList.add("blur");
  });
});

// close
certclose.addEventListener("click", () => {
  certModal.style.display = "none";
  frame.src = "";
  document.body.classList.remove("blur");
});
