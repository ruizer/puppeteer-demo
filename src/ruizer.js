const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    page.setViewport({ width: 1200, height: 600 })
    // 这边测试博客地址绑定的是ruizer.github.io，加载可能非常慢，所以timeout设为了0
    await page.goto('https://www.ruizer.cn/', { timeout: 0, waitUntil: 'networkidle0' });

    await page.screenshot({ path: './data/ruizer/ruizer.png', type: 'png' });

    browser.close();
})();
