const fs = require('fs');
const path = require('path');

const tsxPath = path.join(__dirname, 'src/components/SpaceStar.tsx');
let content = fs.readFileSync(tsxPath, 'utf8');

// Extract the CSS inside styled.div`...`
const cssMatch = content.match(/const StyledWrapper = styled\.div`([\s\S]*?)`;/);
if (!cssMatch) {
  console.error("Could not find CSS");
  process.exit(1);
}
let css = cssMatch[1];

// Prefix classes to avoid conflicts just in case
css = `.wrapper {\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  z-index: 0;\n  pointer-events: none;\n}\n` + css;

// Write CSS Module
const cssPath = path.join(__dirname, 'src/components/SpaceStar.module.css');
fs.writeFileSync(cssPath, css);

// Rewrite TSX
const newTsx = `import React from 'react';
import styles from './SpaceStar.module.css';

const SpaceStar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {[0, 1, 2].map((i) => (
          <div key={i} className={styles['star-group']} style={{ left: \`\${i * 2000}px\` }}>
            <div className={styles.stars} />
            <div className={styles.stars2} />
            <div className={styles.stars3} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default SpaceStar;
`;

fs.writeFileSync(tsxPath, newTsx);
console.log("Conversion successful");
