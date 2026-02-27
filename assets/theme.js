// ─── CURSOR ───
const cursor = document.getElementById('cursor') || document.getElementById('cur');
const ring = document.getElementById('cursorRing') || document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;

if (cursor && ring) {
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top = my + 'px';
  });

  function animateRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top = ry + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();
}

// ─── NAV SCROLL ───
window.addEventListener('scroll', () => {
  const nav = document.getElementById('mainNav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── CART ───
function toggleCart() {
  const drawer = document.getElementById('cartDrawer');
  const overlay = document.getElementById('cartOverlay');
  if (drawer) drawer.classList.toggle('open');
  if (overlay) overlay.classList.toggle('open');
}

// ─── SCROLL REVEAL ───
const reveals = document.querySelectorAll('.reveal');
if (reveals.length > 0) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  reveals.forEach(el => observer.observe(el));
}

// ── INNER PAGES FUNCTIONS ──

function filterProducts(btn, filter){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  // Add filtering logic here
}

function toggleAccordion(btn){
  const item=btn.parentElement;
  item.classList.toggle('open');
}

function selectSize(btn){
  if (btn.classList.contains('sold-out')) return;
  document.querySelectorAll('.size-option').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  
  // Update hidden variant input
  const variantId = btn.getAttribute('data-variant-id');
  const productForm = btn.closest('form');
  if (productForm && variantId) {
    const hiddenInput = productForm.querySelector('[name="id"]');
    if (hiddenInput) hiddenInput.value = variantId;
  }
}

function selectColour(dot){
  document.querySelectorAll('.colour-option').forEach(d=>d.classList.remove('active'));
  dot.classList.add('active');
}

function switchThumb(thumb){
  document.querySelectorAll('.product-thumb').forEach(t=>t.classList.remove('active'));
  thumb.classList.add('active');
  // Add logic to switch main image
}

function updateQty(btn,delta){
  const numEl=btn.parentElement.querySelector('.qty-num');
  const inputEl=btn.parentElement.querySelector('input[type="number"]');
  let val=parseInt(numEl.textContent)+delta;
  if(val<1) val=1;
  numEl.textContent=val;
  if (inputEl) inputEl.value = val;
}

function addToBag(event){
  // Handle async add to cart here if not using standard liquid form submit
  
  const counts = document.querySelectorAll('.cart-count, #cartCount');
  counts.forEach(c => c.textContent = parseInt(c.textContent) + 1);
  const btn = event ? event.currentTarget : document.querySelector('.add-to-bag-btn');
  if(btn) {
    const orig = btn.innerHTML;
    btn.innerHTML = 'Added ✓';
    btn.style.background = 'var(--dark-grey)';
    
    // Optional: Open cart drawer
    toggleCart();
    
    setTimeout(()=>{ btn.innerHTML=orig; btn.style.background=''; },2000);
  }
}