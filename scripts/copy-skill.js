#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');

const target = process.argv[2];
if (!target) {
  console.error('Usage: copy-skill.js <pi|opencode>');
  process.exit(1);
}

const sourceSkillDir = path.join(repoRoot, 'plugins/genguardx/skills/genguardx');
const sourceSkill = path.join(sourceSkillDir, 'SKILL.md');
const sourceRefs = path.join(sourceSkillDir, 'references');

if (target === 'pi') {
  const destDir = path.join(repoRoot, 'packages/pi/skills/genguardx');
  const destRefs = path.join(destDir, 'references');
  fs.mkdirSync(destRefs, { recursive: true });
  fs.copyFileSync(sourceSkill, path.join(destDir, 'SKILL.md'));
  if (fs.existsSync(sourceRefs)) {
    for (const f of fs.readdirSync(sourceRefs)) {
      fs.copyFileSync(path.join(sourceRefs, f), path.join(destRefs, f));
    }
  }
  console.log('Copied skill to packages/pi/skills/genguardx');
} else if (target === 'opencode') {
  const destDir = path.join(repoRoot, 'packages/opencode/skills/genguardx');
  const destRefs = path.join(destDir, 'references');
  fs.mkdirSync(destRefs, { recursive: true });
  fs.copyFileSync(sourceSkill, path.join(destDir, 'SKILL.md'));
  if (fs.existsSync(sourceRefs)) {
    for (const f of fs.readdirSync(sourceRefs)) {
      fs.copyFileSync(path.join(sourceRefs, f), path.join(destRefs, f));
    }
  }
  console.log('Copied skill to packages/opencode/skills/genguardx');
}
