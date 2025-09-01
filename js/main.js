// Modal para imagen ampliada en portafolio
let imagenModal = null;
function abrirImagenModal(img) {
  if(!imagenModal){
    imagenModal = document.createElement('div');
    imagenModal.id = 'imagenAmpliadaModal';
    imagenModal.style.position = 'fixed';
    imagenModal.style.top = '0';
    imagenModal.style.left = '0';
    imagenModal.style.width = '100vw';
    imagenModal.style.height = '100vh';
    imagenModal.style.background = 'rgba(0,0,0,.85)';
    imagenModal.style.zIndex = '10000';
    imagenModal.style.display = 'flex';
    imagenModal.style.alignItems = 'center';
    imagenModal.style.justifyContent = 'center';
    imagenModal.innerHTML = '<img id="imgAmpliada" src="" alt="" style="max-width:90vw; max-height:80vh; border-radius:16px; box-shadow:0 8px 32px rgba(0,0,0,.25);"><button onclick="cerrarImagenModal()" style="position:absolute;top:32px;right:48px;font-size:2em;background:#fff;border-radius:50%;border:none;padding:0 12px;cursor:pointer;">&times;</button>';
    document.body.appendChild(imagenModal);
  }
  document.getElementById('imgAmpliada').src = img.src;
  document.getElementById('imgAmpliada').alt = img.alt;
  imagenModal.style.display = 'flex';
}
function cerrarImagenModal(){
  if(imagenModal){ imagenModal.style.display = 'none'; }
}
// Mostrar/ocultar fotos de portafolio
function mostrarFotosCintilla() {
  document.getElementById("fotosCintilla").style.display = "flex";
}
function cerrarFotosCintilla() {
  document.getElementById("fotosCintilla").style.display = "none";
}
function mostrarFotosLed() {
  document.getElementById("fotosLed").style.display = "flex";
}
function cerrarFotosLed() {
  document.getElementById("fotosLed").style.display = "none";
}
function mostrarFotosComputadoras() {
  document.getElementById("fotosComputadoras").style.display = "flex";
}
function cerrarFotosComputadoras() {
  document.getElementById("fotosComputadoras").style.display = "none";
}
function mostrarFotosCCTV() {
  document.getElementById("fotosCCTV").style.display = "flex";
}
function cerrarFotosCCTV() {
  document.getElementById("fotosCCTV").style.display = "none";
}

// Año footer
document.getElementById('year').textContent = new Date().getFullYear();

// Modo oscuro con persistencia
const root = document.documentElement;
const body = document.body;
const toggle = document.getElementById('themeToggle');
const savedTheme = localStorage.getItem('theme') || 'light';
if(savedTheme === 'dark'){ body.classList.add('dark'); updateToggleText(); }
toggle.addEventListener('click', ()=>{
  body.classList.toggle('dark');
  localStorage.setItem('theme', body.classList.contains('dark') ? 'dark' : 'light');
  updateToggleText();
});
function updateToggleText(){
  toggle.innerHTML = body.classList.contains('dark')
    ? '<i class="bi bi-brightness-high me-1"></i><span>Modo claro</span>'
    : '<i class="bi bi-moon-stars me-1"></i><span>Modo oscuro</span>';
}

// JS: Inicialización correcta de variables globales para gráfico y barras
const skillLabels = [
  'Frontend',
  'Backend (básico)',
  'Automatización',
  'IoT / Arduino',
  'Electricidad',
  'UI/UX',
  'MetaBase/PowerBi',
  'Visual Studio / Cursor / Arduino',
  'Google Colab / App Script',
  'Power Pages / Power Automate'
];
const skillValues = [
  90, // Frontend
  77, // Backend (básico)
  70, // Automatización
  80, // IoT / Arduino
  88, // Electricidad
  75, // UI/UX
  65, // MetaBase/PowerBi
  75, // Visual Studio / Cursor / Arduino
  70, // Google Colab / App Script
  80  // Power Pages / Power Automate
];
let skillsChart;
const ctx = document.getElementById('skillsChart');
const skillBars = document.querySelectorAll('.skill-bar');
const fills = document.querySelectorAll('.skill-fill');

// Animar barras de habilidades cuando son visibles
const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target;
      el.style.width = el.getAttribute('data-fill');
      io.unobserve(el);
    }
  })
}, { threshold: .4 });
fills.forEach(f=> io.observe(f));

// Inicializar gráfico radar (estado base: todos normales)
function renderRadar(selectedIdx = null) {
  let data, bgColors, labelColors, pointRadii;
  if(selectedIdx === null) {
    data = skillValues;
    bgColors = skillLabels.map(_ => 'rgba(0,123,255,.15)');
    labelColors = skillLabels.map(_ => '#212529');
    pointRadii = skillLabels.map(_ => 4);
  } else {
    data = skillValues;
    bgColors = skillLabels.map((_,i) => selectedIdx === i ? 'rgba(255,152,0,.7)' : 'rgba(0,123,255,.15)');
    labelColors = skillLabels.map((_,i) => selectedIdx === i ? '#ff9800' : '#212529');
    pointRadii = skillLabels.map((_,i) => selectedIdx === i ? 8 : 4);
  }
  if(skillsChart) skillsChart.destroy();
  skillsChart = new Chart(ctx, {
    type: 'radar',
    data:{
      labels: skillLabels,
      datasets:[{
        label:'Nivel',
        data: data,
        fill:true,
        backgroundColor:'rgba(0,123,255,.15)',
        borderColor:getComputedStyle(document.body).getPropertyValue('--brand').trim(),
        pointBackgroundColor:getComputedStyle(document.body).getPropertyValue('--brand-2').trim(),
        borderWidth:2,
        pointRadius: pointRadii,
        pointBackgroundColor: bgColors
      }]
    },
    options:{
      responsive:true,
      animation:{ duration:800 },
      scales:{ r:{ angleLines:{ color:'#bcd4f6' }, grid:{ color:'#bcd4f6' }, suggestedMin:0, suggestedMax:100, ticks:{ showLabelBackdrop:false, color:'var(--muted)' }, pointLabels:{ color:labelColors } } },
      plugins:{ legend:{ display:false } }
    }
  });
}
renderRadar();

// Interacción: resaltar habilidad seleccionada
skillBars.forEach((bar, idx) => {
  bar.addEventListener('click', (e) => {
    renderRadar(idx);
    skillBars.forEach(b => b.classList.remove('active-skill'));
    bar.classList.add('active-skill');
    e.stopPropagation();
  });
});
// Reiniciar gráfico al hacer clic fuera de las barras
window.addEventListener('click', (e) => {
  if(!e.target.classList.contains('skill-bar') && !e.target.classList.contains('skill-fill')){
    renderRadar();
    skillBars.forEach(b => b.classList.remove('active-skill'));
  }
});

// Portafolio filtrable
const buttons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.portfolio .item');
buttons.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    buttons.forEach(b=> b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    items.forEach(card=>{
      card.style.display = (filter === 'all' || card.dataset.cat === filter) ? 'block' : 'none';
    });
  });
});

// Back to top
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', ()=>{
  toTop.style.display = window.scrollY > 400 ? 'flex' : 'none';
});
toTop.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));

// Formulario de contacto conectado a Google Sheets
const scriptURL = "https://script.google.com/macros/s/AKfycbzetnPBdKovym-HGrZ27VW9J8kkMtymMTEv5jzX3bNG1y02XUEAN7uZ8CRjqE3BNmqdGw/exec"; // <-- Cambia esto por tu URL real
const form = document.getElementById("contactForm");
const msg = document.getElementById("formMsg");
form.addEventListener("submit", e => {
  e.preventDefault();
  fetch(scriptURL, { method: "POST", body: new FormData(form)})
    .then(response => {
      if(response.ok){
        msg.textContent = "✅ Mensaje enviado correctamente";
        msg.classList.remove("text-danger");
        msg.classList.add("text-success");
        form.reset();
      }else{
        throw new Error("Network response was not ok");
      }
    })
    .catch(err => {
      msg.textContent = "❌ Error al enviar. Intenta de nuevo.";
      msg.classList.remove("text-success");
      msg.classList.add("text-danger");
    });
});
