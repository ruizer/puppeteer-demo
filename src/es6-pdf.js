const puppeteer = require('puppeteer')
const timeout = (d) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(1)
            } catch (e) {
                reject(0)
            }
        }, d)
    })
}

puppeteer.launch().then(async browser => {
    let page = await browser.newPage()

    await page.goto('http://es6.ruanyifeng.com/#README')

    await timeout(2000)

    const aLis = await page.evaluate(() => {
        const list = [...document.querySelectorAll('ol li a')]

        return list.map(a => {
            return {
              href: a.href.trim(),
              name: a.innerText
            }
        })
    })
    await page.pdf({path: `./data/es6-pdf/${aLis[0].name}.pdf`});
    page.close()

    // 这里也可以使用promise all，但太多了，谨慎操作
    for (let i = 1; i < aLis.length; i++) {
      page = await browser.newPage()

      const a = aLis[i];

      await page.goto(a.href);

      await timeout(2000)

      await page.pdf({path: `./data/es6-pdf/${a.name}.pdf`});

      page.close();
    }

    browser.close();
})
