const puppeteer = require('puppeteer');

async function scrape() {
    // Launch Puppeteer
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    let currentPage = 1;
    let lastPageReached = false;
    const allFormattedData = [];
    // Open the initial webpage
    await page.goto('https://www.grants.gov/search-grants', { timeout: 50000 });

    // Wait for the table to load and extract the links from the first `td` of each `tr`
    while (!lastPageReached) {
        
        await page.waitForSelector('tbody tr td:first-child a', { timeout: 50000 });
      
        const links = await page.$$eval('tbody tr td:first-child a', anchors => anchors.map(a => a.href));

        ////ekhanei main page theke details page e jacche prottekbar

        // Loop through each link
        for (let i = 0; i < links.length; i++) {
            let link = links[i];
            try {
                await page.goto(link);

                // Wait for the target elements to load and extract the text from the second `td` of each `tr` within the `tbody` with class `class2`
                await page.waitForSelector('div.flex-6 tbody tr td:nth-child(2)');
                const data = await page.$$eval('div.flex-6 tbody tr td:nth-child(2)', tds => tds.map(td => td.textContent.trim()));

                // Log the type of each element in the data array
                data.forEach((item, index) => {
                    console.log(`Element ${index} type: ${typeof item}`);
                });

                // Parse the date string
                const dateString = data[12];
                const parts = dateString.split(" ");
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthIndex = monthNames.indexOf(parts[0]);
                const day = parseInt(parts[1].replace(",", ""), 10);
                const year = parseInt(parts[2], 10);
                const date = new Date(year, monthIndex, day + 1);





                const dateString2 = data[15];
                const parts2 = dateString2.split(" ");
                const monthNames2 = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const monthIndex2 = monthNames2.indexOf(parts2[0]);
                const day2 = parseInt(parts2[1].replace(",", ""), 10);
                const year2 = parseInt(parts2[2], 10);
                const date2 = new Date(year2, monthIndex2, day2 + 1);

                // Map the extracted data to an object with the required keys
                const formattedData = {
                    'GrantNo': data[1],
                    'Title': data[2],
                    'Category': data[6],
                    'ReleaseDate': date.toISOString(),
                    'ExpiryDate': date2.toISOString(), // Format the date as ISO string
                };

                // Add the formatted data to the array
                allFormattedData.push(formattedData);

                // Process the extracted data (e.g., print it or save it to a file/database)
                console.log(formattedData);
            } catch (error) {
                console.error(`Error processing link ${link}:`, error);
            }
        }
        //for loop shesh mane ek page er data scrape korse
        //ekta page er bhitore jotogula grants ase tar details bair kore
        // Check for the last page
        const lastPageSelector =
            'tfoot nav ul li a.usa-pagination__button.bg-white.usa-current';
        const lastPageElement = await page.$(lastPageSelector);
        if (lastPageElement) {
            const pgnumber = await page.evaluate(
                (el) => el.textContent.trim(),
                lastPageElement
            );
            if (pgnumber === '97') {
                lastPageReached = true;
                console.log('Reached the last page (page 97). Stopping extraction.');
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

    // Log the total number of grants
    console.log("Total grants: " + allFormattedData.length);

    // Close the browser
    await browser.close();
}

// Run the scraping function
scrape().catch(console.error);
