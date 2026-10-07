/* ASL for Teachers: shared helpers used by every page */

const SITE_NAME = "ASL for Teachers";

const NAV = [
  { href: "learn.html", label: "Learn", key: "learn" },
  { href: "practice.html", label: "Practice", key: "practice" },
  { href: "dictionary.html", label: "Sign Dictionary", key: "dictionary" },
  { href: "resources.html", label: "Resources", key: "resources" },
  { href: "progress.html", label: "My Progress", key: "progress" }
];

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function param(name) { return new URLSearchParams(location.search).get(name); }
function signById(id) { return SIGNS.find(s => s.id === id); }
function moduleById(id) { return MODULES.find(m => String(m.id) === String(id)); }
function lessonTitle(catId) {
  const l = MODULES[1].lessons.find(x => x.id === catId);
  return l ? l.title : catId;
}

/* ---------- Saved progress (stays in this browser only) ---------- */
const STORE_KEY = "asl4t-progress-v1";
function loadStore() {
  try { return Object.assign({ learned: [], lessons: [], quizBest: 0 }, JSON.parse(localStorage.getItem(STORE_KEY) || "{}")); }
  catch (e) { return { learned: [], lessons: [], quizBest: 0 }; }
}
function saveStore(s) { try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) {} }
function isLearned(id) { return loadStore().learned.includes(id); }
function setLearned(id, on) {
  const s = loadStore();
  s.learned = s.learned.filter(x => x !== id);
  if (on) s.learned.push(id);
  saveStore(s);
}
function isLessonDone(key) { return loadStore().lessons.includes(key); }
function setLessonDone(key, on) {
  const s = loadStore();
  s.lessons = s.lessons.filter(x => x !== key);
  if (on) s.lessons.push(key);
  saveStore(s);
}

/* Module progress: [done, total] */
function moduleProgress(m) {
  if (m.id === 2) {
    const learned = loadStore().learned;
    const ids = SIGNS.map(s => s.id);
    return [ids.filter(id => learned.includes(id)).length, ids.length, "signs"];
  }
  const done = m.lessons.filter(l => isLessonDone(`m${m.id}-${l.id}`)).length;
  return [done, m.lessons.length, "lessons"];
}

/* ---------- Header and footer ---------- */
function renderChrome(active) {
  const header = document.getElementById("site-header");
  if (header) {
    header.className = "site-header";
    header.innerHTML = `
      <div class="container">
        <a class="brand" href="index.html">
          <span class="brand-badge"><img src="images/hold.webp" alt=""></span>
          <span class="brand-name">${SITE_NAME}</span>
        </a>
        <nav class="nav" aria-label="Main">
          ${NAV.map(n => `<a href="${n.href}"${n.key === active ? ' aria-current="page"' : ""}>${n.label}</a>`).join("")}
          <a class="btn btn-primary btn-small" href="start.html" style="margin-left:8px">Start Here</a>
        </nav>
      </div>`;
  }
  const footer = document.getElementById("site-footer");
  if (footer) {
    footer.className = "site-footer";
    footer.innerHTML = `
      <div class="container">
        <div class="stack" style="gap:6px">
          <span class="name">${SITE_NAME}</span>
          <span>Created at Teachers College, Ball State University</span>
        </div>
        <nav class="row" aria-label="Footer" style="gap:8px 24px">
          <a href="about.html">About</a>
          <a href="about.html#signers">Signers and Collaborators</a>
          <a href="about.html#accessibility">Accessibility Statement</a>
        </nav>
      </div>`;
  }
}

/* ---------- Video ----------
   Videos are found by name: videos/<sign id>.mp4
   If the file is not there yet, a placeholder shows instead. */
function videoSrc(id) { return `videos/${id}.mp4`; }

function videoPlayerHTML(id, label) {
  return `
    <div class="video-wrap" id="player">
      <video src="${videoSrc(id)}" controls playsinline preload="metadata" loop aria-label="${esc(label)} in ASL">
        <track kind="captions" src="videos/${id}.vtt" srclang="en" label="English" default>
      </video>
      <div class="video-placeholder">
        <strong>[Signer video: ${esc(label)}]</strong>
        <span>Add videos/${esc(id)}.mp4 to show the video here.</span>
      </div>
    </div>
    <div class="controls">
      <div class="group" role="group" aria-label="Playback speed">
        <span class="label">Speed</span>
        <button class="btn btn-small toggle" data-speed="0.5" aria-pressed="false">0.5x</button>
        <button class="btn btn-small toggle" data-speed="0.75" aria-pressed="false">0.75x</button>
        <button class="btn btn-small toggle" data-speed="1" aria-pressed="true">1x</button>
      </div>
      <div class="group">
        <button class="btn btn-small toggle" data-act="mirror" aria-pressed="false">Mirror</button>
        <button class="btn btn-small toggle" data-act="loop" aria-pressed="true">Loop</button>
      </div>
    </div>`;
}

function initVideoPlayer(root) {
  const wrap = root.querySelector(".video-wrap");
  const video = wrap.querySelector("video");
  watchMissing(video, wrap);
  root.querySelectorAll("[data-speed]").forEach(btn => {
    btn.addEventListener("click", () => {
      video.playbackRate = Number(btn.dataset.speed);
      root.querySelectorAll("[data-speed]").forEach(b => b.setAttribute("aria-pressed", String(b === btn)));
    });
  });
  const mirror = root.querySelector('[data-act="mirror"]');
  mirror.addEventListener("click", () => {
    const on = mirror.getAttribute("aria-pressed") !== "true";
    mirror.setAttribute("aria-pressed", String(on));
    wrap.classList.toggle("mirrored", on);
  });
  const loop = root.querySelector('[data-act="loop"]');
  loop.addEventListener("click", () => {
    const on = loop.getAttribute("aria-pressed") !== "true";
    loop.setAttribute("aria-pressed", String(on));
    video.loop = on;
  });
}

function watchMissing(video, box) {
  const mark = () => box.classList.add("missing");
  video.addEventListener("error", mark);
  if (video.error) mark();
}

/* Small looping preview used on cards */
function thumbHTML(src, text) {
  return `<span class="thumb"><video src="${src}" muted loop playsinline autoplay preload="metadata" aria-hidden="true"></video><span class="ph">${esc(text)}</span></span>`;
}
function initThumbs(root = document) {
  root.querySelectorAll(".thumb video").forEach(v => {
    if (v.dataset.watched) return;
    v.dataset.watched = "1";
    watchMissing(v, v.parentElement);
  });
}

function signCardHTML(s) {
  const learned = isLearned(s.id);
  return `
    <a class="card sign-card" href="sign.html?id=${encodeURIComponent(s.id)}">
      ${thumbHTML(videoSrc(s.id), "")}
      ${learned ? '<span class="check" aria-label="Learned"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B2620" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"></path></svg></span>' : ""}
      <span class="g">${esc(s.gloss)}</span>
      <span class="m">${esc(s.meaning)}</span>
    </a>`;
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

function moduleCardHTML(m) {
  const [done, total, unit] = moduleProgress(m);
  const pct = total ? Math.round(done / total * 100) : 0;
  const label = done === 0 ? `${total} ${unit}` : `${done} of ${total} ${unit} done`;
  return `
    <a class="card module-card" href="module.html?m=${m.id}" style="padding:22px 24px 24px">
      <span class="top"><span class="num">${m.id}</span><img src="${m.image}" alt=""></span>
      <span class="title">${esc(m.title)}</span>
      <span class="muted small">${esc(m.blurb)}</span>
      <span class="foot"><span class="progress"><span style="width:${pct}%"></span></span><span>${label}</span></span>
    </a>`;
}
