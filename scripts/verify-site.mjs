import { readFileSync, existsSync } from "node:fs";

const requiredFiles = [
  "index.html",
  "styles.css",
  "CNAME",
  ".nojekyll",
  ".github/workflows/pages.yml",
  "assets/avatar.jpg",
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
const cname = read("CNAME").trim();
const workflow = read(".github/workflows/pages.yml");

const requiredHtml = [
  ["page title", "<title>J.G. Montoya"],
  ["hero heading", "J.G. Montoya"],
  ["hero section", 'id="hero"'],
  ["about section", 'id="about"'],
  ["projects section", 'id="projects"'],
  ["writing section", 'id="writing"'],
  ["contact section", 'id="contact"'],
  ["blog link", "https://blog.jgmontoya.com"],
  ["github link", "https://github.com/jgmontoya"],
  ["nostr link", "https://npub.world/npub1jgm0ntzjr03wuzj5788llhed7l6fst05um4ej2r86ueaa08etv6sgd669p"],
  ["email link", "mailto:hi@jgmontoya.com"],
  ["x/twitter link", "https://x.com/jgmontoyas"],
  ["shaka project", "Shaka"],
  ["shaka github link", "https://github.com/jgmontoya/shaka"],
  ["featured user search post", "https://blog.jgmontoya.com/2026/02/22/user-search.html"],
  ["featured nip70 post", "https://blog.jgmontoya.com/2026/02/10/nip70-relay-status.html"],
  ["featured bitcoin post", "https://blog.jgmontoya.com/2025/02/04/CAddrMan-Vulnerability.html"],
];

for (const [label, value] of requiredHtml) {
  if (!html.includes(value)) {
    failures.push(`Missing ${label}: ${value}`);
  }
}

if (!css.includes("@media")) {
  failures.push("CSS should include responsive media rules.");
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
