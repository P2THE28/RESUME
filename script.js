<script>
    /* small script to trigger progress bar animations once page loads */
    window.addEventListener('load', () => {
      // ensure bars have width set inline (already are) — this restarts animation if needed
      document.querySelectorAll('.bar > i').forEach(el => {
        const w = el.style.width || '60%';
        el.style.width = '0%';
        setTimeout(()=> el.style.width = w, 100);
      });
    });
  </script>
  
  <!-- 🔊 Scroll & Click Sounds -->
  <script>
    // Preload audio
    const scrollSound = new Audio('assets/scroll.mp3');
    const clickSound = new Audio('assets/click.mp3');

    scrollSound.volume = 0.35;
    clickSound.volume = 0.45;

    // Play click sound on any clickable project card
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.project-card');
      if(card) clickSound.play().catch(()=>{});
    });

    // Throttle scroll sound so it doesn't spam
    let scrollTimeout = false;
    window.addEventListener('scroll', () => {
      if(!scrollTimeout){
        scrollSound.play().catch(()=>{});
        scrollTimeout = true;
        setTimeout(()=> scrollTimeout = false, 400);
      }
    });
  </script>
