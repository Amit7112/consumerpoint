import fs from 'node:fs';

const cssPath = 'src/index.css';
let css = fs.readFileSync(cssPath, 'utf8');

// 1. Replace all "Manrope Variable" with normal sans-serif font stack
css = css.replaceAll(
  '"Manrope Variable"',
  '"Inter Variable", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
);

// 2. Replace all negative letter-spacing values with letter-spacing: normal;
const negSpacingRegex = /letter-spacing:\s*-\s*\d+(\.\d+)?(px|em|rem)?/g;
const matches = css.match(negSpacingRegex) || [];
console.log('Found negative letter-spacings:', matches.length);
console.log('Matches:', matches);

css = css.replace(negSpacingRegex, 'letter-spacing: normal');

fs.writeFileSync(cssPath, css, 'utf8');
console.log('Successfully updated src/index.css');

