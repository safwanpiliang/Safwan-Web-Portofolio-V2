const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(process.cwd(), 'src'));
let total = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  // First, change all text-slate-900 to text-slate-700 (for body texts)
  newContent = newContent.replace(/(?<=\s|["'`])text-slate-900(?=\s|["'`])/g, 'text-slate-700');
  
  // Then, change the invisible text-slate-100 to text-slate-900 (for headers)
  newContent = newContent.replace(/(?<=\s|["'`])text-slate-100(?=\s|["'`])/g, 'text-slate-900');
  
  // Also fix text-slate-200 if any
  newContent = newContent.replace(/(?<=\s|["'`])text-slate-200(?=\s|["'`])/g, 'text-slate-700');

  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    total++;
  }
});
console.log('Fixed text colors in ' + total + ' files.');
