const puppeteer = require('puppeteer');
const path = require('path');

// Parse CLI args: --input <file> --output <path> --width <px>
const args = process.argv.slice(2);
const get = (flag, def) => { const i = args.indexOf(flag); return i !== -1 ? args[i + 1] : def; };

const inputFile  = get('--input',  'dihadi_recruitment_email.html');
const outputFile = get('--output', 'cta_image.png');
const vpWidth    = parseInt(get('--width', '600'), 10);

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Set viewport to a good mobile/email width
    await page.setViewport({ width: vpWidth, height: 1200, deviceScaleFactor: 2 });

    // Load the local HTML file
    const filePath = `file://${path.resolve(__dirname, inputFile)}`;
    console.log(`Loading ${filePath}...`);
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    // Add a temporary wrapper to isolate the CTA for a clean screenshot
    await page.evaluate(() => {
        const cta = document.querySelector('.cta');
        if (cta) {
            // Remove the footer note from the screenshot since we want that as live text
            const note = cta.querySelector('.cta-n');
            if (note) note.remove();

            // We want to force it to render the light-mode version exactly as intended
            cta.style.margin = '0';

            // Create an absolute container to just hold the CTA
            document.body.innerHTML = '';
            document.body.style.background = 'transparent';

            const wrapper = document.createElement('div');
            wrapper.style.padding = '20px'; // Give it some breathing room for the shadow
            wrapper.style.display = 'inline-block';
            wrapper.appendChild(cta);
            document.body.appendChild(wrapper);
        }
    });

    // Select the newly isolated element to screenshot
    const element = await page.$('.cta');

    if (element) {
        const outputPath = path.resolve(__dirname, outputFile);
        await element.screenshot({ path: outputPath, omitBackground: true });
        console.log(`Image saved to ${outputPath}`);
    } else {
        console.log('Could not find .cta element');
    }

    await browser.close();
})();
