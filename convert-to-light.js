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

const replacements = {
  'bg-slate-900': 'bg-[#f1f5f9]',
  'bg-slate-800': 'bg-white',
  'text-white': 'text-slate-900',
  'text-slate-400': 'text-slate-600',
  'text-slate-300': 'text-slate-700',
  'border-white/10': 'border-slate-300',
  'border-slate-800': 'border-slate-300',
  'bg-white/5': 'bg-slate-900/5',
  'bg-white/10': 'bg-slate-900/10',
  'hover:bg-white/10': 'hover:bg-slate-900/10',
  'from-slate-900': 'from-[#f1f5f9]',
  'to-slate-900': 'to-[#f1f5f9]',
  'via-slate-900': 'via-[#f1f5f9]',
  'from-slate-800': 'from-white',
  'to-slate-800': 'to-white',
};

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let newContent = content;
  
  for (const [dark, light] of Object.entries(replacements)) {
    // Only replace whole words (tailwind classes)
    const escapedDark = dark.replaceAll('/', '\\/');
    const regex = new RegExp(`(?<=\\s|["'\`])${escapedDark}(?=\\s|["'\`])`, 'g');
    newContent = newContent.replace(regex, light);
  }
  
  if (newContent !== content) {
    fs.writeFileSync(file, newContent, 'utf8');
    total++;
  }
});
console.log('Converted ' + total + ' files to Light Mode.');
