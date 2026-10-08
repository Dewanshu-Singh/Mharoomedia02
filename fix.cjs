const fs = require('fs');
let content = fs.readFileSync('style.css', 'utf8');
content = content.replace(/\r\n/g, '\n');

// Update collaborations-section
let target1 = 
`.collaborations-section {
  position: relative;
  padding: var(--spacing-8) 0;
  background-color: var(--primary);
  background-image: linear-gradient(135deg, rgba(95,0,0,0.95) 0%, rgba(142,1,1,0.8) 100%);
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}`;

let replacement1 = 
`.collaborations-section {
  position: relative;
  padding: var(--spacing-8) 0;
  background: #730202;
  overflow: hidden;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}`;
content = content.replace(target1, replacement1);

// Update signature-case-study
let target2 = 
`.signature-case-study {
  position: relative;
  background-color: var(--primary);
  color: var(--text-light);
  overflow: hidden;
  padding: 96px 0;
}`;

let replacement2 = 
`.signature-case-study {
  position: relative;
  background: #730202;
  color: var(--text-light);
  overflow: hidden;
  padding: 96px 0;
}`;
content = content.replace(target2, replacement2);

// Hide scs-bg and scs-overlay so the solid background shows
let target3 = 
`.scs-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 0;
}`;

let replacement3 = 
`.scs-bg {
  display: none;
}`;
content = content.replace(target3, replacement3);

let target4 = 
`.scs-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(95,0,0,0.95) 0%, rgba(142,1,1,0.8) 100%);
  z-index: 1;
}`;

let replacement4 = 
`.scs-overlay {
  display: none;
}`;
content = content.replace(target4, replacement4);


fs.writeFileSync('style.css', content);
