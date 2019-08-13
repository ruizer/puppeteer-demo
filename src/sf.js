const puppeteer = require('puppeteer')
const fs = require('fs')

puppeteer.launch({ headless: false }).then(async browser => {
    const page = await browser.newPage()
    page.setViewport({ width: 1200, height: 600 })

    await page.goto('https://segmentfault.com/channel/frontend')

    const SfArticleList = await page.evaluate(() => {
        const list = [...document.querySelectorAll('.news-list .news__item-info>a')]

        return list.map(el => {
            if (!el.hasChildNodes()) {
                return false
            }
            const div = el.firstChild
            return { href: el.href.trim(), title: div.innerText }
        }).filter(v => v)
    })
    fs.writeFile('./data/sf/sf.json', JSON.stringify(SfArticleList), (err) => {
        if (err) throw err;
        console.log('文件已被保存');
    });
    console.log('SfArticleList:', SfArticleList);

    await page.screenshot({ path: './data/sf/sf.png', type: 'png' });
    browser.close();
})
