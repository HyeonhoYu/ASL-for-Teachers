/* ASL for Teachers: shared helpers used by every page */

const SITE_NAME = "ASL for Teachers";

/* ROOT is set on each page: "./" on the home page, "../" inside folders.
   u() builds a link that works on GitHub Pages and on your own computer. */
function u(path) { return (typeof ROOT === "string" ? ROOT : "./") + path; }

const NAV = [
  { href: "learn/", label: "Learn", key: "learn" },
  { href: "practice/", label: "Practice", key: "practice" },
  { href: "dictionary/", label: "Sign Dictionary", key: "dictionary" },
  { href: "resources/", label: "Resources", key: "resources" },
  { href: "progress/", label: "My Progress", key: "progress" }
];

function esc(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function param(name) { return new URLSearchParams(location.search).get(name); }
function signById(id) { return SIGNS.find(s => s.id === id); }
function moduleById(id) { return MODULES.find(m => String(m.id) === String(id)); }
function signLink(id) { return u(`sign/?id=${encodeURIComponent(id)}`); }
function lessonTitle(catId) {
  const l = MODULES[1].lessons.find(x => x.id === catId);
  return l ? l.title : catId;
}
const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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
function moduleProgress(m) {
  if (m.id === 2) {
    const learned = loadStore().learned;
    return [SIGNS.filter(s => learned.includes(s.id)).length, SIGNS.length, "signs"];
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
        <a class="brand" href="${u("")}">
          <span class="brand-badge"><img src="${u("images/hold.webp")}" alt=""></span>
          <span class="brand-name">${SITE_NAME}</span>
        </a>
        <nav class="nav" aria-label="Main">
          ${NAV.map(n => `<a href="${u(n.href)}"${n.key === active ? ' aria-current="page"' : ""}>${n.label}</a>`).join("")}
          <a class="btn btn-primary btn-small" href="${u("start/")}" style="margin-left:8px">Start Here</a>
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
          <a href="${u("about/")}">About</a>
          <a href="${u("about/#signers")}">Reviewers and Collaborators</a>
          <a href="${u("about/#accessibility")}">Accessibility Statement</a>
        </nav>
      </div>`;
  }
}

/* ---------- Pictures that may not exist yet ----------
   <img data-fallback> hides itself and shows its placeholder if the file is missing. */
function initFallbacks(root = document) {
  root.querySelectorAll("img[data-fallback]").forEach(img => {
    if (img.dataset.watched) return;
    img.dataset.watched = "1";
    const box = img.closest(".pic");
    const mark = () => box && box.classList.add("missing");
    img.addEventListener("error", mark);
    if (img.complete && img.naturalWidth === 0) mark();
  });
}
function picHTML(src, placeholder, alt = "") {
  return `<span class="pic"><img src="${u(src)}" alt="${esc(alt)}" data-fallback loading="lazy"><span class="ph">${placeholder}</span></span>`;
}

/* ---------- Body map (location) ---------- */
const ZONES = {
  forehead: { cx: 100, cy: 44, rx: 30, ry: 11 },
  eyes:     { cx: 100, cy: 66, rx: 32, ry: 9 },
  face:     { cx: 100, cy: 76, rx: 40, ry: 32, front: true },
  chin:     { cx: 100, cy: 108, rx: 16, ry: 8 },
  chest:    { cx: 100, cy: 152, rx: 32, ry: 16 },
  stomach:  { cx: 100, cy: 196, rx: 30, ry: 15 },
  high:     { cx: 100, cy: 72, rx: 88, ry: 34, front: true },
  neutral:  { cx: 100, cy: 160, rx: 78, ry: 26, front: true },
  low:      { cx: 100, cy: 210, rx: 80, ry: 24, front: true }
};
function bodyMapSVG(locs, small) {
  const list = [].concat(locs || []);
  const zones = list.map(l => ZONES[l]).filter(Boolean).map(z => z.front
    ? `<ellipse cx="${z.cx}" cy="${z.cy}" rx="${z.rx}" ry="${z.ry}" fill="#F2B83B" fill-opacity=".45" stroke="#A8243A" stroke-width="3" stroke-dasharray="7 6"/>`
    : `<ellipse cx="${z.cx}" cy="${z.cy}" rx="${z.rx}" ry="${z.ry}" fill="#F2B83B" stroke="#A8243A" stroke-width="3"/>`).join("");
  const label = list.map(l => LOCATIONS[l] ? LOCATIONS[l].name : l).join(" and ");
  return `<svg viewBox="0 0 200 250" class="bodymap${small ? " small" : ""}" role="img" aria-label="Location: ${esc(label)}">
    <rect x="52" y="122" width="96" height="116" rx="40" fill="#A8243A"/>
    <rect x="62" y="118" width="76" height="22" rx="10" fill="#FFFFFF"/>
    <rect x="70" y="132" width="9" height="30" rx="3" fill="#861B2E"/>
    <rect x="121" y="132" width="9" height="30" rx="3" fill="#861B2E"/>
    <circle cx="100" cy="72" r="50" fill="#F6D3BE"/>
    <path d="M50 70 Q50 20 100 20 Q150 20 150 70 Q140 48 100 46 Q60 48 50 70Z" fill="#6B3F2A"/>
    <circle cx="100" cy="16" r="10" fill="#6B3F2A"/>
    <path d="M100 0 l3 6 6 .8 -4.5 4 1 6 -5.5 -3 -5.5 3 1 -6 -4.5 -4 6 -.8z" fill="#F2B83B"/>
    <circle cx="84" cy="74" r="4" fill="#3B2620"/><circle cx="116" cy="74" r="4" fill="#3B2620"/>
    <path d="M90 92 Q100 99 110 92" fill="none" stroke="#3B2620" stroke-width="3" stroke-linecap="round"/>
    ${zones}
  </svg>`;
}

/* ---------- Movement animation ---------- */
const MOVE_PATHS = {
  "tap":           { d: "M100 35 L100 95", pts: "0;1;0", dur: 1.1, arrow: false },
  "forward":       { d: "M45 70 L155 70", dur: 1.4 },
  "toward":        { d: "M155 70 L45 70", dur: 1.4 },
  "down":          { d: "M100 22 L100 118", dur: 1.4 },
  "up":            { d: "M100 118 L100 22", dur: 1.4 },
  "circle":        { d: "M100 28 A42 42 0 1 1 99.9 28", dur: 1.6, arrow: false },
  "wiggle":        { d: "M40 70 l12 -14 l12 28 l12 -28 l12 28 l12 -28 l12 28 l12 -28 l12 28 l12 -14", pts: "0;1;0", dur: 1.4, arrow: false },
  "side":          { d: "M55 70 L145 70", pts: "0;1;0", dur: .8, arrow: false },
  "sweep-in":      { d: "M160 40 Q130 115 45 85", dur: 1.4 },
  "twist":         { d: "M65 80 A36 36 0 0 1 135 80", pts: "0;1;0", dur: 1.2, arrow: false },
  "nod":           { d: "M100 45 L100 95", pts: "0;1;0", dur: .9, arrow: false },
  "flip":          { d: "M55 95 A45 45 0 0 1 145 95", dur: 1.2 },
  "brush-up":      { d: "M100 118 L100 30", dur: .9 },
  "apart":         { d: "M95 70 L35 70", d2: "M105 70 L165 70", dur: 1.4 },
  "slide":         { d: "M40 85 L160 85", dur: 1.3 },
  "slide-up":      { d: "M55 115 L145 35", dur: 2 },
  "close":         { d: "M100 30 L100 85", pts: "0;1;0", dur: 1, arrow: false },
  "open":          { d: "M100 70 L45 30", d2: "M100 70 L155 30", d3: "M100 70 L45 110", d4: "M100 70 L155 110", dur: 1 },
  "flick":         { d: "M100 95 L100 30", dur: .8 },
  "question-mark": { d: "M72 48 C72 14 128 14 128 46 C128 70 100 68 100 92", dur: 1.8 }
};
function movementSVG(id) {
  const m = MOVE_PATHS[id];
  if (!m) return "";
  const paths = [m.d, m.d2, m.d3, m.d4].filter(Boolean);
  const arrowOn = m.arrow !== false;
  const dots = paths.map((d, i) => `
    <path d="${d}" fill="none" stroke="#D9C6C9" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" ${arrowOn ? 'marker-end="url(#ah)"' : ""}/>
    <circle r="11" fill="#F2B83B" stroke="#3B2620" stroke-width="3" ${reduceMotion ? `cx="${d.split(" ")[0].slice(1)}" cy="${d.split(" ")[1]}"` : ""}>
      ${reduceMotion ? "" : `<animateMotion dur="${m.dur}s" repeatCount="indefinite" path="${d}" ${m.pts ? `keyPoints="${m.pts}" keyTimes="0;.5;1" calcMode="linear"` : ""}/>`}
    </circle>`).join("");
  const extra = id === "question-mark" ? '<circle cx="100" cy="112" r="5" fill="#D9C6C9"/>' : "";
  return `<svg viewBox="0 0 200 140" class="movemap" role="img" aria-label="Movement: ${esc(MOVEMENTS[id] ? MOVEMENTS[id].name : id)}">
    <defs><marker id="ah" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="4" markerHeight="4" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10z" fill="#D9C6C9"/></marker></defs>
    ${dots}${extra}
  </svg>`;
}

/* ---------- The sign card ---------- */
const HANDS_TEXT = { one: "One hand", both: "Both hands", base: "One hand works on the other hand" };

function recipeHTML(s, opts = {}) {
  const r = s.recipe || {};
  const face = FACES[r.face] || FACES.neutral;
  const faceHTML = face.img
    ? picHTML(face.img, "", `Frog Baby, ${face.name} face`)
    : `<span class="pic missing"><span class="ph">${esc(face.name)}</span></span>`;
  if (r.compound) {
    return `<div class="recipe compound">
      <div class="part"><h3>Two or more signs together</h3>
        <div class="row" style="gap:10px">${r.compound.map((p, i) => `${i ? '<span class="plus" aria-hidden="true">+</span>' : ""}<span class="chunk">${esc(p)}</span>`).join("")}</div>
        <p class="muted small">${esc(s.summary)}</p>
      </div>
      <div class="part"><span class="part-label">Face</span><div class="face">${faceHTML}</div><p class="part-name">${esc(face.name)}</p></div>
    </div>`;
  }
  const hand = HANDSHAPES[r.hand] || { name: r.hand, tip: "" };
  const move = MOVEMENTS[r.movement] || { name: r.movement, tip: "" };
  const locs = [].concat(r.location || []);
  return `<div class="recipe">
    <div class="part">
      <span class="part-label">1. Handshape</span>
      <div class="hand">${picHTML(`images/handshapes/${r.hand}.webp`, `<strong>${esc(hand.name)}</strong><small>Add your photo</small>`, hand.name)}</div>
      <p class="part-name">${esc(hand.name)}</p>
      <p class="part-tip">${esc(HANDS_TEXT[r.hands] || "")}${hand.tip ? `. ${esc(hand.tip)}` : ""}</p>
    </div>
    <div class="part">
      <span class="part-label">2. Location</span>
      ${bodyMapSVG(locs)}
      <p class="part-name">${esc(locs.map(l => LOCATIONS[l] ? LOCATIONS[l].name : l).join(" and "))}</p>
    </div>
    <div class="part">
      <span class="part-label">3. Movement</span>
      ${movementSVG(r.movement)}
      <p class="part-name">${esc(move.name)}</p>
      <p class="part-tip">${esc(move.tip)}</p>
    </div>
    <div class="part">
      <span class="part-label">4. Face</span>
      <div class="face">${faceHTML}</div>
      <p class="part-name">${esc(face.name)}</p>
    </div>
  </div>`;
}

function referenceURL(s) {
  const word = s.meaning.split(",")[0].replace(/[^A-Za-z ]/g, "").trim().toLowerCase().replace(/ +/g, "+");
  return REFERENCE_URL.replace("{word}", encodeURIComponent(word).replace(/%2B/g, "+"));
}

/* ---------- Cards ---------- */
function signCardHTML(s) {
  const learned = isLearned(s.id);
  const r = s.recipe || {};
  return `
    <a class="card sign-card" href="${signLink(s.id)}">
      <span class="thumb">${r.compound ? `<span class="thumb-compound">${r.compound.map(esc).join(" + ")}</span>` : bodyMapSVG(r.location, true)}</span>
      ${learned ? '<span class="check" aria-label="Learned"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B2620" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"></path></svg></span>' : ""}
      <span class="g">${esc(s.gloss)}</span>
      <span class="m">${esc(s.meaning)}</span>
    </a>`;
}
function moduleCardHTML(m) {
  const [done, total, unit] = moduleProgress(m);
  const pct = total ? Math.round(done / total * 100) : 0;
  const label = done === 0 ? `${total} ${unit}` : `${done} of ${total} ${unit} done`;
  return `
    <a class="card module-card" href="${u(`module/?m=${m.id}`)}" style="padding:22px 24px 24px">
      <span class="top"><span class="num">${m.id}</span><img src="${u(m.image)}" alt=""></span>
      <span class="title">${esc(m.title)}</span>
      <span class="muted small">${esc(m.blurb)}</span>
      <span class="foot"><span class="progress"><span style="width:${pct}%"></span></span><span>${label}</span></span>
    </a>`;
}
function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
