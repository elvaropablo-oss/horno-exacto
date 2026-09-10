import { readdir, stat } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const files = await collect(root);
for (const file of files) {
  const check = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (check.status !== 0) {
    process.stderr.write(check.stderr || check.stdout);
    process.exit(check.status || 1);
  }
}
console.log(`Syntax checked ${files.length} JavaScript files.`);

async function collect(directory) {
  const files = [];
  for (const entry of await readdir(directory)) {
    if (['.git', 'dist', 'node_modules'].includes(entry)) continue;
    const full = path.join(directory, entry);
    if ((await stat(full)).isDirectory()) files.push(...await collect(full));
    else if (/\.(?:js|mjs)$/.test(entry)) files.push(full);
  }
  return files;
}
