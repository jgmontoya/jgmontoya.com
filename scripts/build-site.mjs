import { copyFileSync, existsSync, mkdirSync, rmSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { publicFiles } from "./site-files.mjs";

const outputDir = "_site";

rmSync(outputDir, { recursive: true, force: true });
mkdirSync(outputDir, { recursive: true });

for (const file of publicFiles) {
  if (!existsSync(file) || !statSync(file).isFile()) {
    throw new Error(`Missing public source file: ${file}`);
  }

  const destination = join(outputDir, file);
  mkdirSync(dirname(destination), { recursive: true });
  copyFileSync(file, destination);
}

console.log(`Built ${publicFiles.length} public files in ${outputDir}.`);
