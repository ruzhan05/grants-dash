const puppeteer = require('puppeteer');

async function extractTableData() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const targetUrl = 'https://grants.nih.gov/funding/searchguide/index.html#/';
    await page.goto(targetUrl);
    await page.waitForSelector('tbody > tr');

    let data = [];
    let lastPageReached = false;

    // Function to scrape data from the current page
    async function scrapeCurrentPage() {
        const pageData = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('tbody > tr.ng-scope'));
            return rows.map(row => {
                const cells = row.querySelectorAll('td');

                const titleElement = cells[0].querySelector('a');
                const title = titleElement ? titleElement.textContent.trim() : cells[0].textContent.trim();
                const docnum = cells[1].textContent.trim();
                const organization = cells[2].textContent.trim();
                const releaseDate = cells[3].textContent.trim();
                const otherInfo = cells[4].textContent.trim();

                return { title, docnum, organization, releaseDate, otherInfo };
            });
        });
        data = data.concat(pageData);
        console.log(data);

    }

    while (!lastPageReached) {
        await scrapeCurrentPage();

        const liElements = await page.$$('ul > li.page-item.ng-scope');
        const lastLi = liElements[liElements.length - 1];
        const className = await lastLi.evaluate(el => el.className);

        // Check if the lastLi element contains both classes "page-item" and "ng-scope" and "disabled"
        if (className.includes('page-item') && className.includes('ng-scope') && className.includes('disabled')) {
            lastPageReached = true;
            break;
        } else {

            // ensure that the new page has loaded its content. 
            await Promise.all([
                page.waitForResponse(response => response.status() === 200, { timeout: 60000 }),
                // Click the next button to go to the next page
                lastLi.click()
            ]);
            await page.waitForSelector('tbody > tr:first-child', { timeout: 60000 });
        }
    }

    await browser.close();

    return data; // Return data to use it later if needed


}

extractTableData().then(data => {
    console.log(data);
}).catch(err => {
    console.error(err);
});
