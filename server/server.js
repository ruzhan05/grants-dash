const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const { extractNIHData } = require('./nih_server'); // imported the function to scrape NIH data
const app = express();
const port = 3001;

// Enable CORS for all routes
app.use(cors());

async function extractGrantGovData() {
  const browser = await puppeteer.launch({
    // headless: false,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  const targetUrl = 'https://www.grants.gov/search-grants';
  await page.goto(targetUrl);

  await page.waitForSelector('tbody > tr > td');

  // Initialize data array
  const grantsData = [];

  let currentPage = 1;
  let lastPageReached = false;
  let totalCellCount = 0;

  while (!lastPageReached) {
    // Extract table data for the current page
    const tableRows = await page.$$('tbody > tr');
    for (const row of tableRows) {
      const cells = await row.$$('td');
      let rowData = [];
      for (const cell of cells) {
        const cellText = await page.evaluate(
          (el) => el.textContent.trim(),
          cell
        );
        rowData.push(cellText);
      }
      totalCellCount += rowData.length;

      // Add grant data to array
      grantsData.push({
        OpportunityId: rowData[0],
        Title: rowData[1],
        Department: rowData[2],
        Status: rowData[3],
        PostedDate: rowData[4],
        ClosingDate: rowData[5],
      });
    }

    // Check for the last page
    const lastPageSelector =
      'tfoot nav ul li a.usa-pagination__button.bg-white.usa-current';
    const lastPageElement = await page.$(lastPageSelector);
    if (lastPageElement) {
      const pgnumber = await page.evaluate(
        (el) => el.textContent.trim(),
        lastPageElement
      );
      if (pgnumber === '98') {
        lastPageReached = true;
        console.log('Reached the last page (page 98). Stopping extraction.');
      } else {
        // Navigate to the next page
        await page.click(
          'tfoot nav ul li button.usa-pagination__next-page'
        );
        await page.waitForSelector(
          'tbody > tr:first-child',
          { timeout: 60000 }
        ); // Wait for the first table row to appear
        currentPage++;
      }
      console.log(pgnumber);
    } else {
      // No "Next" button, likely reached the last page
      lastPageReached = true;
      console.log('Reached the last page. Stopping extraction.');
    }
  }

  console.log(totalCellCount);

  // Save data to JSON file
  const filePath = path.join(__dirname, 'grantsGov.json');
  fs.writeFileSync(filePath, JSON.stringify(grantsData, null, 2), 'utf8');

  await browser.close();
}


app.get('/scrape', async (req, res) => {
  try {
    await extractGrantGovData();
    await extractNIHData(); // added the function to scrape NIH data
    res.status(200).send('Scraping completed and data saved to JSON file.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error occurred during scraping.');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
