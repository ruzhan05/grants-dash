const { extractNIHData } = require('../nih_server')
async function nihgrant
    (req, res) {
    console.log('nihgrant function called');
    try {
        await extractNIHData(); // added the function to scrape NIH data
        res.status(200).send('Scraping completed and data saved to JSON file.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occurred during scraping.');
    }
};
module.exports = { nihgrant }