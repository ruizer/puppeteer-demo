const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.ruizer.cn/', { timeout: 0, waitUntil: 'networkidle0' });

    await page.screenshot({ path: './data/ruizer/ruizer.png', type: 'png' });

    // browser.close();
})();
