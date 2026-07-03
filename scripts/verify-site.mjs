import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "styles.css",
  "CNAME",
  ".nojekyll",
  "favicon.ico",
  "theme.js",
  ".github/workflows/pages.yml",
  "assets/javier-simpson.jpeg",
];

const failures = [];

for (const file of requiredFiles) {
  if (!existsSync(file)) {
    failures.push(`Missing required file: ${file}`);
  }
}

const read = (path) => (existsSync(path) ? readFileSync(path, "utf8") : "");
const html = read("index.html");
const css = read("styles.css");
const themeScript = read("theme.js");
const cname = read("CNAME").trim();
const workflow = read(".github/workflows/pages.yml");

const requiredHtml = [
  ["page title", "<title>Javier G. Montoya"],
  ["hero heading", "Javier G. Montoya"],
  ["favicon link", 'href="favicon.ico"'],
  ["theme script", 'src="theme.js"'],
  ["theme toggle", "data-theme-toggle"],
  ["theme switch role", 'role="switch"'],
  ["theme switch state", 'aria-checked="false"'],
  ["theme toggle track", "theme-toggle__track"],
  ["theme toggle thumb", "theme-toggle__thumb"],
  ["moon theme icon", "theme-icon--moon"],
  ["sun theme icon", "theme-icon--sun"],
  ["new avatar", "assets/javier-simpson.jpeg"],
  ["hero section", 'id="hero"'],
  ["about section", 'id="about"'],
  ["projects section", 'id="projects"'],
  ["writing section", 'id="writing"'],
  ["contact section", 'id="contact"'],
  ["blog link", "https://blog.jgmontoya.com"],
  ["github link", "https://github.com/jgmontoya"],
  ["linkedin link", "https://linkedin.com/in/jgmontoya"],
  ["nostr link", "https://npub.world/npub1jgm0ntzjr03wuzj5788llhed7l6fst05um4ej2r86ueaa08etv6sgd669p"],
  ["email link", "mailto:hello@jgmontoya.com"],
  ["x/twitter link", "https://x.com/jgmontoyas"],
  ["shaka project", "Shaka"],
  ["shaka github link", "https://github.com/jgmontoya/shaka"],
  ["whitenoise project", "WhiteNoise / Marmot"],
  ["whitenoise github link", "https://github.com/marmot-protocol/whitenoise-rs"],
  ["featured user search post", "https://blog.jgmontoya.com/2026/02/22/user-search.html"],
  ["featured nip70 post", "https://blog.jgmontoya.com/2026/02/10/nip70-relay-status.html"],
  ["featured bitcoin post", "https://blog.jgmontoya.com/2025/02/04/CAddrMan-Vulnerability.html"],
];

for (const [label, value] of requiredHtml) {
  if (!html.includes(value)) {
    failures.push(`Missing ${label}: ${value}`);
  }
}

if (html.includes("assets/avatar.jpg")) {
  failures.push("Page should use assets/javier-simpson.jpeg instead of assets/avatar.jpg.");
}

if (html.includes("data-theme-toggle-label")) {
  failures.push("Theme toggle should use icons instead of visible Light/Dark label text.");
}

if (!css.includes("@media")) {
  failures.push("CSS should include responsive media rules.");
}

if (!css.includes("prefers-color-scheme: dark")) {
  failures.push("CSS should include system dark theme support.");
}

if (!css.includes(':root[data-theme="light"]') || !css.includes(':root[data-theme="dark"]')) {
  failures.push("CSS should include explicit light and dark theme overrides.");
}

for (const value of [".theme-toggle__track", ".theme-toggle__thumb", '[aria-checked="true"]']) {
  if (!css.includes(value)) {
    failures.push(`Theme toggle CSS should include ${value}.`);
  }
}

if (css.includes('content: " ->"') || css.includes('content: "→"') || css.includes(".actions a::after")) {
  failures.push("CSS should not generate arrow suffixes after link labels.");
}

for (const value of ["localStorage", "dataset.theme", "prefers-color-scheme", "data-theme-toggle", "aria-checked"]) {
  if (!themeScript.includes(value)) {
    failures.push(`Theme script should include ${value}.`);
  }
}

if (themeScript.includes("textContent")) {
  failures.push("Theme script should not update visible Light/Dark label text.");
}

if (cname !== "jgmontoya.com") {
  failures.push(`CNAME should be jgmontoya.com, got "${cname}".`);
}

for (const value of ["actions/configure-pages", "actions/upload-pages-artifact", "actions/deploy-pages"]) {
  if (!workflow.includes(value)) {
    failures.push(`Pages workflow should include ${value}.`);
  }
}

if (failures.length > 0) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("Static site verification passed.");
