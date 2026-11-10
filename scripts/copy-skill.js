#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const repoRoot = path.resolve(__dirname, "..");

const target = process.argv[2];
if (!["pi", "opencode"].includes(target)) {
  console.error("Usage: copy-skill.js <pi|opencode>");
  process.exit(1);
}

const sourceSkillDir = path.join(repoRoot, "plugins/genguardx/skills/genguardx");
const destDir = path.join(repoRoot, "packages", target, "skills/genguardx");

fs.rmSync(destDir, { recursive: true, force: true });
fs.cpSync(sourceSkillDir, destDir, { recursive: true });
console.log(`Copied skill to packages/${target}/skills/genguardx`);
