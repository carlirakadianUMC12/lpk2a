// Efek mengetik
const teks = [
  "Mahasiswa Teknik Informatika",
  "Calon mantu terbaik mamahmu",
  "Penggemar roblox",
];
const el = document.getElementById("ketik");
let i = 0, j = 0, hapus = false;

function ketik() {
  const kata = teks[i];
  el.textContent = kata.slice(0, j);
  if (!hapus && j < kata.length) { j++; setTimeout(ketik, 70); }
  else if (!hapus) { hapus = true; setTimeout(ketik, 1500); }
  else if (j > 0) { j--; setTimeout(ketik, 35); }
  else { hapus = false; i = (i + 1) % teks.length; setTimeout(ketik, 300); }
}
ketik();

// Muncul saat di-scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("tampil"); });
}, { threshold: 0.15 });
document.querySelectorAll(".reveal").forEach(s => io.observe(s));

// Progress bar, tombol naik, menu aktif
const bar = document.getElementById("progress");
const naik = document.getElementById("naik");
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("main section");

window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  bar.style.width = (scrollY / max * 100) + "%";
  naik.classList.toggle("muncul", scrollY > 400);

  let aktif = "";
  sections.forEach(s => { if (scrollY >= s.offsetTop - 140) aktif = s.id; });
  links.forEach(a => a.classList.toggle("aktif", a.getAttribute("href") === "#" + aktif));
});
naik.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

// Tema terang/gelap
const tombolTema = document.getElementById("tema");
function setTema(t) {
  document.documentElement.setAttribute("data-tema", t);
  tombolTema.textContent = t === "gelap" ? "☀️" : "🌙";
}
setTema(matchMedia("(prefers-color-scheme: dark)").matches ? "gelap" : "terang");
tombolTema.addEventListener("click", () => {
  setTema(document.documentElement.getAttribute("data-tema") === "gelap" ? "terang" : "gelap");
});

// Animasi petir biru di header
const cv = document.getElementById("petir");
const ctx = cv.getContext("2d");
function ukur() { cv.width = cv.offsetWidth; cv.height = cv.offsetHeight; }
ukur(); addEventListener("resize", ukur);

function petir(x, y, sudut, panjang, tebal) {
  ctx.beginPath(); ctx.moveTo(x, y);
  for (let k = 0; k < panjang; k += 14) {
    sudut += (Math.random() - 0.5) * 1.1;
    x += Math.cos(sudut) * 14; y += Math.sin(sudut) * 14;
    ctx.lineTo(x, y);
    if (Math.random() < 0.06 && tebal > 0.8) petir(x, y, sudut + (Math.random() - 0.5) * 1.5, panjang - k - 40, tebal * 0.6);
  }
  ctx.lineWidth = tebal; ctx.stroke();
}

function kilat() {
  ctx.clearRect(0, 0, cv.width, cv.height);
  const sisi = Math.random() < 0.5;
  const x = sisi ? cv.width * (0.05 + Math.random() * 0.2) : cv.width * (0.75 + Math.random() * 0.2);
  ctx.shadowColor = "#00d4ff"; ctx.shadowBlur = 18; ctx.strokeStyle = "#cfeeff";
  petir(x, 0, Math.PI / 2 + (sisi ? 0.3 : -0.3), cv.height * 1.1, 2.6);
  setTimeout(() => ctx.clearRect(0, 0, cv.width, cv.height), 140);
  setTimeout(kilat, 1500 + Math.random() * 2500);
}
if (!matchMedia("(prefers-reduced-motion: reduce)").matches) setTimeout(kilat, 1200);