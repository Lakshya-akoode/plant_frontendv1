/**
 * Run this AFTER closing Cursor/IDE and stopping the dev server
 * to remove the old livetest folder. Routes now live under app/ directly.
 *
 * From frontend folder: node scripts/remove-livetest-folder.cjs
 * From project root:    node frontend/scripts/remove-livetest-folder.cjs
 */
const fs = require('fs');
const path = require('path');

const livetestDir = path.join(__dirname, '..', 'src', 'app', 'livetest');

function rmRecursive(dir) {
  if (!fs.existsSync(dir)) {
    console.log('livetest folder already removed.');
    return;
  }
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) rmRecursive(p);
    else fs.unlinkSync(p);
  }
  fs.rmdirSync(dir);
  console.log('Removed:', dir);
}

rmRecursive(livetestDir);
console.log('Done.');
