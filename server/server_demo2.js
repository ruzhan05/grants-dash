const puppeteer = require('puppeteer');

async function scrape() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const allFormattedData = [];

    await page.goto('https://www.grants.gov/search-grants', { timeout: 60000 });

    async function scrapePage() {
        await page.waitForSelector('tbody tr td:first-child a', { timeout: 50000 });

        const links = await page.$$eval('tbody tr td:first-child a', anchors => anchors.map(a => a.href));
        console.log(`Found ${links.length} links on the page.`);

        for (let link of links) {
            try {
                console.log(`Navigating to link: ${link}`);
                await page.goto(link, { waitUntil: 'networkidle2' });

                await page.waitForSelector('div.flex-6 tbody tr td:nth-child(2)');
                const data = await page.$$eval('div.flex-6 tbody tr td:nth-child(2)', tds => tds.map(td => td.textContent.trim()));

                const parseDate = (dateString) => {
                    const parts = dateString.split(" ");
                    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                    const monthIndex = monthNames.indexOf(parts[0]);
                    const day = parseInt(parts[1].replace(",", ""), 10);
                    const year = parseInt(parts[2], 10);
                    return new Date(year, monthIndex, day + 1);
                };

                const releaseDate = parseDate(data[12]);
                const expiryDate = parseDate(data[15]);

                const formattedData = {
                    'GrantNo': data[1],
                    'Title': data[2],
                    'Category': data[6],
                    'ReleaseDate': releaseDate.toISOString(),
                    'ExpiryDate': expiryDate.toISOString(),
                };

                allFormattedData.push(formattedData);
                console.log(`Scraped data: ${JSON.stringify(formattedData)}`);

                await page.goBack({ waitUntil: 'networkidle2' });
                await page.waitForSelector('tbody tr td:first-child a', { timeout: 50000 });

            } catch (error) {
                console.error(`Error processing link ${link}:`, error);
                await page.goto('https://www.grants.gov/search-grants', { timeout: 60000 });
                await page.waitForSelector('tbody tr td:first-child a', { timeout: 50000 });
            }
        }
    }

    async function navigateNextPage() {
        const nextPageSelector = 'tfoot nav ul li button.usa-pagination__next-page';
        const nextPageButton = await page.$(nextPageSelector);

        if (nextPageButton) {
            console.log('Navigating to the next page.');

            await page.click(
                'tfoot nav ul li button.usa-pagination__next-page'),
                page.waitForNavigation({ waitUntil: 'networkidle2' }),

                await page.waitForSelector('tbody tr td:first-child a', { timeout: 50000 });
            return true;
        } else {
            console.log('No next page button found.');
            return false;
        }
    }

    let keepScraping = true;
    while (keepScraping) {
        console.log(`Scraping page...`);
        await scrapePage();
        console.log(`Navigating to next page...`);
        keepScraping = await navigateNextPage();
    }

    console.log("Total grants: " + allFormattedData.length);

    await browser.close();
}

scrape().catch(console.error);
