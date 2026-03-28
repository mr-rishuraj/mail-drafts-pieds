const puppeteer = require('puppeteer');
const path = require('path');

// Parse CLI args: --input <file> --output <path> --width <px>
const args = process.argv.slice(2);
const get = (flag, def) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : def; };

const inputFile  = get('--input',  'dihadi-intern-gemini.html');
const outputFile = get('--output', 'assets/dihadi/email_render.png');
const cardWidth  = parseInt(get('--width', '672'), 10);

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const filePath = `file://${path.resolve(__dirname, inputFile)}`;

  // First pass: load at target width to measure the inner card height
  await page.setViewport({ width: cardWidth, height: 800, deviceScaleFactor: 1 });
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 800)); // let web fonts settle

  const cardRect = await page.evaluate(() => {
    // The inner email card is the first div child of body
    const card = document.querySelector('body > div');
    const rect = card.getBoundingClientRect();
    return { x: Math.round(rect.left), y: Math.round(rect.top), width: Math.round(rect.width), height: Math.round(rect.height) };
  });

  // Second pass: 2x device scale for retina quality, tall enough to fit the full card
  const scale = 2;
  await page.setViewport({ width: cardWidth, height: cardRect.y + cardRect.height + 64, deviceScaleFactor: scale });
  await page.goto(filePath, { waitUntil: 'networkidle0', timeout: 30000 });
  await new Promise(r => setTimeout(r, 800));

  const outputPath = path.resolve(__dirname, outputFile);
  // clip is in CSS pixels; deviceScaleFactor doubles the output resolution
  await page.screenshot({
    path: outputPath,
    type: 'png',
    clip: {
      x: cardRect.x,
      y: cardRect.y,
      width: cardRect.width,
      height: cardRect.height,
    },
  });
  console.log(`Email card screenshot saved → ${outputPath} (output: ${cardRect.width * scale}×${cardRect.height * scale}px @ 2x)`);

  await browser.close();
})();
