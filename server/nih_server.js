//main code where the grants whose expiry is before May 2024 are not included

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function extractTableData() {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const targetUrl = 'https://grants.nih.gov/funding/searchguide/index.html#/';
    await page.goto(targetUrl);
    await page.waitForSelector('tbody > tr', { timeout: 60000 });

    let data = [];
    let docnumSet = new Set(); // To track unique document numbers
    let lastPageReached = false;

    // Function to scrape data from the current page
    async function scrapeCurrentPage() {
        const pageData = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('tbody > tr.ng-scope'));
            const result = [];
            const cutoffDate = new Date('2024-01-06');

            rows.forEach(row => {
                const cells = row.querySelectorAll('td');

                const titleElement = cells[0].querySelector('a');
                const title = titleElement ? titleElement.textContent.trim() : cells[0].textContent.trim();
                const docnum = cells[1].textContent.trim();
                const organization = cells[2].textContent.trim();
                const releaseDate = cells[3].textContent.trim();
                const expiryDate = cells[4].textContent.trim();

                const expiryDateObj = new Date(expiryDate);

                if (expiryDateObj >= cutoffDate) {
                    result.push({ title, docnum, organization, releaseDate, expiryDate });
                }
            });

            return result;
        });

        // Add unique data to the main data array
        pageData.forEach(item => {
            if (!docnumSet.has(item.docnum)) {
                docnumSet.add(item.docnum);
                data.push(item);
            }
        });
    }

    while (!lastPageReached) {
        await scrapeCurrentPage();

        const liElements = await page.$$('ul > li.page-item.ng-scope');
        const lastLi = liElements[liElements.length - 1];
        const className = await lastLi.evaluate(el => el.className);

        if (className.includes('disabled')) {
            lastPageReached = true;
            console.log("Scraping Completed");
            break;
        } else {
            try {
                await page.evaluate(element => {
                    element.scrollIntoView();
                }, lastLi);

                await Promise.all([
                    page.waitForResponse(response => response.status() === 200, { timeout: 60000 }),
                    lastLi.click()
                ]);

                await page.waitForSelector('tbody > tr:first-child', { timeout: 60000 });
            } catch (error) {
                console.error("Error clicking next button:", error);
                lastPageReached = true;
                break;
            }
        }
    }

    const filePath = path.join(__dirname, 'nihManNoDup.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    await browser.close();
    console.log("Total grants found:", data.length);
    return data;
}

extractTableData().then(data => {
}).catch(err => {
    console.error(err);
});
