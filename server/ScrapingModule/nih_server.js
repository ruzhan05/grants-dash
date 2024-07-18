const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const WebSocket = require('ws');
const GrantModel = require('../models/Grants');

const wss = new WebSocket.Server({ port: 8080 }); // WebSocket server on port 8080

let wsClient = null;

// Handle WebSocket connection
wss.on('connection', (ws) => {
    wsClient = ws;
    ws.on('close', () => {
        wsClient = null;
    });
});

async function extractNIHData() {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    const targetUrl = 'https://grants.nih.gov/funding/searchguide/index.html#/';
    await page.goto(targetUrl, { timeout: 50000 });
    await page.waitForSelector('tbody > tr', { timeout: 60000 });

    let data = [];
    let docnumSet = new Set();
    let lastPageReached = false;
    let grantsCount = 0; // Track the number of grants
    let totalGrants = 0; // Total number of grants

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
                const link = titleElement ? titleElement.href : '';
                const docnum = cells[1].textContent.trim();
                const organization = cells[2].textContent.trim();
                const releaseDate = cells[3].textContent.trim();
                const expiryDate = cells[4].textContent.trim();
                const expiryDateObj = new Date(expiryDate);

                if (expiryDateObj >= cutoffDate) {
                    result.push({ title, link, docnum, organization, releaseDate, expiryDate });


                }

            });

            return result;
        });

        pageData.forEach(item => {
            if (!docnumSet.has(item.docnum)) {
                docnumSet.add(item.docnum);
                data.push(item);
                grantsCount++;   //initial

                // Log each grant's details to the console
                console.log(`Grant ${grantsCount}:`, item);

                if (wsClient) {
                    wsClient.send(JSON.stringify({ grantsCount }));
                }
            }
        });
    }
    ;

    while (!lastPageReached) {
        await scrapeCurrentPage();
        const activeLi = await page.$('ul > li.page-item.ng-scope.active');

        if (activeLi) {
            // Extract the page number from the active li element
            const pageNumber = await page.evaluate(element => {
                return parseInt(element.querySelector('a').textContent.trim(), 10);
            }, activeLi);


            // Check if the page number is 696
            if (pageNumber === 200) {
                lastPageReached = true;
                console.log("Scraping Completed");
                if (wsClient) {
                    wsClient.send(JSON.stringify({ message: "Scraping Completed", grantsCount, totalGrants }));
                }
                break;
            }
            console.log(pageNumber)
        }

        // Continue to the next page
        const liElements = await page.$$('ul > li.page-item.ng-scope');
        const lastLi = liElements[liElements.length - 1];






        // const liElements = await page.$$('ul > li.page-item.ng-scope');
        // page-item ng-scope active
        // const lastLi = liElements[liElements.length - 1];
        // const lastLi2 = liElements[liElements.length - 2];  /// 2nd last li tag
        //new for pg number
        // const pageNumber = await page.evaluate(element => {
        //     return element.querySelector('a').textContent.trim();
        // }, lastLi2);
        // console.log(pageNumber);

        // const className = await lastLi.evaluate(el => el.className);

        // if (className.includes('disabled')) {


        // Check if the page number is 696


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
            if (wsClient) {
                wsClient.send(JSON.stringify({ message: "Error occurred", error: error.toString() }));
            }
            lastPageReached = true;
            break;
        }

    }


    const existingDataCount = await GrantModel.countDocuments({});
    if (existingDataCount > 0) {
        await GrantModel.deleteMany({});
        console.log(`Deleted ${existingDataCount} old records.`);
    }

    await GrantModel.insertMany(data);

    const filePath = path.join(__dirname, 'nihManNoDup.json');
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

    await browser.close();
    console.log("Total grants found:", data.length);
    return data;
}

module.exports = { extractNIHData };
