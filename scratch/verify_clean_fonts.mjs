import fs from 'node:fs';

const html = fs.readFileSync('dist/products/index.html', 'utf8');
const neg = html.match(/letter-spacing:\s*-[^;}"']+/g);
console.log('Negative letter-spacing count in dist/products/index.html:', neg ? neg.length : 0);
if (neg) console.log('Found:', neg);

const manrope = html.includes('Manrope');
console.log('Contains Manrope in dist:', manrope);

const fontMatches = html.match(/font-family:[^;}"']+/g);
console.log('Distinct font-families in dist:');
console.log([...new Set(fontMatches)]);

