const express = require('express');
const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

// const app = express();
// const port = 3001;

// Enable CORS for all routes
// app.use(cors());

// async function extractTableData() {
//     const browser = await puppeteer.launch({
//         headless: false,
//         defaultViewport: null,
//     });
//     const page = await browser.newPage();
//     const targetUrl = 'https://grants.nih.gov/funding/searchguide/index.html#/';
//     await page.goto(targetUrl);
//     await page.waitForSelector('tbody > tr > td');
//     // Initialize data array
//     const grantsData = [];

//     let currentPage = 1;
//     let lastPageReached = false;
//     let totalCellCount = 0;

//     while (!lastPageReached) {
//         // Extract table data for the current page
//         const tableRows = await page.$$('tbody > tr');
//         for (const row of tableRows) {
//             const cells = await row.$$('td');
//             let rowData = [];
//             for (const cell of cells) {
//                 const cellText = await page.evaluate(
//                     (el) => el.textContent.trim(),
//                     cell
//                 );
//                 rowData.push(cellText);
//             }
//             totalCellCount += rowData.length;

//             // Add grant data to array
//             grantsData.push({
//                 Title: rowData[0],
//                 NoticeNumber: rowData[1],
//                 Organization: rowData[2],
//                 ReleaseDate: rowData[3],
//                 ExpiryDate: rowData[4],
//             });
//         }
//     }
//     await browser.close();
//     console.log(grantsData);

// }
// extractTableData();


// chat gpt without pagination (working)


// async function extractTableData() {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     const targetUrl = 'https://grants.nih.gov/funding/searchguide/index.html#/';
//     await page.goto(targetUrl);
//     await page.waitForSelector('tbody > tr');


//     const isDisabled = await page.$('.page-item ng-scope .disabled'); // added for finding last page(not correct fully)
//     const data = await page.evaluate(() => {
//         const rows = Array.from(document.querySelectorAll('tbody > tr'));
//         return rows.map(row => {
//             const cells = row.querySelectorAll('td');

//             const title = cells[0].querySelector('a') ? cells[0].querySelector('a').textContent.trim() : cells[0].textContent.trim();
//             const docnum = cells[1].textContent.trim();
//             const organization = cells[2].textContent.trim();
//             const releaseDate = cells[3].textContent.trim();
//             const expiryDate = cells[4].textContent.trim(); // Adjust this based on your specific data structure
//             return { title, docnum, organization, releaseDate, expiryDate };
//             // , docnum, organization, releaseDate, otherInfo ;
//         });
//     });

//     console.log(data);
//     await browser.close();
// }

// extractTableData();






// Check for the last page








// pagination chatgpt


// const puppeteer = require('puppeteer');

async function extractTableData() {
    const browser = await puppeteer.launch({ headless: true }); // Run in headless mode
    const page = await browser.newPage();
    const targetUrl = 'https://grants.nih.gov/funding/searchguide/index.html#/';
    await page.goto(targetUrl);
    await page.waitForSelector('tbody > tr');

    let allData = [];
    let isLastPage = false;

    // while (!isLastPage) {



        // Extract data from the current page
        const data = await page.evaluate(() => {
            const rows = Array.from(document.querySelectorAll('tbody > tr'));
            return rows.map(row => {
                const cells = row.querySelectorAll('td');
                const title = cells[0].querySelector('a') ? cells[0].querySelector('a').textContent.trim() : cells[0].textContent.trim();
                const docnum = cells[1].textContent.trim();
                const organization = cells[2].textContent.trim();
                const releaseDate = cells[3].textContent.trim();
                const expiryDate = cells[4].textContent.trim(); // Adjust this based on your specific data structure
                return { title, docnum, organization, releaseDate, expiryDate };
            });

        });
        allData = allData.concat(data);


        const lastPageSelector =
            '.row.justify-content-center ul.pagination.ng-untouched.ng-valid.ng-isolate-scope.ng-not-empty.ng-dirty.ng-valid-parse li.page-item.ng-scope' ;
        const lastPageElement = await page.$(lastPageSelector) !== null;
        // Evaluate the page to find the class of the last `li` tag

        const ul = document.querySelector('ul.pagination.ng-untouched.ng-valid.ng-isolate-scope.ng-not-empty.ng-dirty.ng-valid-parse');
        const lastLiDis = ul.querySelector('li.page-item.ng-scope.disabled')

        const liElements = ul.querySelectorAll('li.page-item.ng-scope');
        const lastLiElement = liElements[liElements.length - 1];
        console.log(lastPageElement);
        const link = lastLiElement.querySelector('a');
        link.click();
        if(lastLiElement.classList.contains('disabled')){ 
            isLastPage = true
            console.log('Reached the last page. Stopping extraction.');
           }
        else{
            link.click();
           }




        //new code 



        // Wait for the `ul` element to load
        //   await page.waitForSelector('ul.pagination.ng-untouched.ng-valid.ng-isolate-scope.ng-not-empty.ng-dirty.ng-valid-parse');

        //   // Evaluate the page to find the class of the last `li` tag
        // //   const isLastLiDisabled = await page.evaluate(() => {
        //     const ul = document.querySelector('ul.pagination.ng-untouched.ng-valid.ng-isolate-scope.ng-not-empty.ng-dirty.ng-valid-parse');
        //     const lastLiDis = ul.querySelector('li.page-item.ng-scope.disabled')

        //     const liElements = ul.querySelectorAll('li.page-item.ng-scope');
        //     const lastLiElement = liElements[liElements.length - 1];
        //     const link = lastLiElement.querySelector('a');
        //     link.click();
        //     if(lastLiElement.classList.contains('disabled')){ 
        //         isLastPage = true
        //        }
        //     else{
        //         link.click();
        //        }





        //   console.log(`Is the last 'li' tag disabled? ${isLastLiDisabled}`);

        // })

        // new code

    // }

    // console.log(JSON.stringify(allData, null, 2)); // Log the data in a readable JSON format
    // await browser.close();
}

extractTableData();
