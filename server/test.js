const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// const app = express();
// const port = 3001;

// Enable CORS for all routes
// app.use(cors());

async function extractTableData() {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });
    const page = await browser.newPage();
    const targetUrl = 'https://grants.nih.gov/funding/searchguide/index.html#/';
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

            // Add grant data to array with Date conversion
            grantsData.push({
                Title: rowData[0],
                NoticeNumber: rowData[1],
                Organization: rowData[2],
                ReleaseDate: new Date(rowData[3]), // Date object
                ExpiryDate: new Date(rowData[4]),  // Date object
            });
        }
    }
    await browser.close();
    console.log(grantsData);
}

extractTableData();
