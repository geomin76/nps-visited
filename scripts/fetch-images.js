/**
 * One-time script to download park images from the NPS API.
 * Usage: node scripts/fetch-images.js
 *
 * Downloads the first image for each park and saves to public/parks/{index}.jpg
 * Kings Canyon (index 37) and Sequoia (index 52) share parkCode 'seki',
 * so we use images[0] for Kings Canyon and images[1] for Sequoia.
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_KEY = 'DEMO_KEY';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'parks');

// Park index -> parkCode mapping (from Service.js)
const parks = [
    { index: 0, parkCode: 'acad' },
    { index: 1, parkCode: 'npsa' },
    { index: 2, parkCode: 'arch' },
    { index: 3, parkCode: 'badl' },
    { index: 4, parkCode: 'bibe' },
    { index: 5, parkCode: 'bisc' },
    { index: 6, parkCode: 'blca' },
    { index: 7, parkCode: 'brca' },
    { index: 8, parkCode: 'cany' },
    { index: 9, parkCode: 'care' },
    { index: 10, parkCode: 'cave' },
    { index: 11, parkCode: 'chis' },
    { index: 12, parkCode: 'cong' },
    { index: 13, parkCode: 'crla' },
    { index: 14, parkCode: 'cuva' },
    { index: 15, parkCode: 'deva' },
    { index: 16, parkCode: 'dena' },
    { index: 17, parkCode: 'drto' },
    { index: 18, parkCode: 'ever' },
    { index: 19, parkCode: 'gaar' },
    { index: 20, parkCode: 'jeff' },
    { index: 21, parkCode: 'glac' },
    { index: 22, parkCode: 'glba' },
    { index: 23, parkCode: 'grca' },
    { index: 24, parkCode: 'grte' },
    { index: 25, parkCode: 'grba' },
    { index: 26, parkCode: 'grsa' },
    { index: 27, parkCode: 'grsm' },
    { index: 28, parkCode: 'gumo' },
    { index: 29, parkCode: 'hale' },
    { index: 30, parkCode: 'havo' },
    { index: 31, parkCode: 'hosp' },
    { index: 32, parkCode: 'indu' },
    { index: 33, parkCode: 'isro' },
    { index: 34, parkCode: 'jotr' },
    { index: 35, parkCode: 'katm' },
    { index: 36, parkCode: 'kefj' },
    { index: 37, parkCode: 'seki', imageIndex: 0 },  // Kings Canyon
    { index: 38, parkCode: 'kova' },
    { index: 39, parkCode: 'lacl' },
    { index: 40, parkCode: 'lavo' },
    { index: 41, parkCode: 'maca' },
    { index: 42, parkCode: 'meve' },
    { index: 43, parkCode: 'mora' },
    { index: 44, parkCode: 'neri' },
    { index: 45, parkCode: 'noca' },
    { index: 46, parkCode: 'olym' },
    { index: 47, parkCode: 'pefo' },
    { index: 48, parkCode: 'pinn' },
    { index: 49, parkCode: 'redw' },
    { index: 50, parkCode: 'romo' },
    { index: 51, parkCode: 'sagu' },
    { index: 52, parkCode: 'seki', imageIndex: 1 },  // Sequoia
    { index: 53, parkCode: 'shen' },
    { index: 54, parkCode: 'thro' },
    { index: 55, parkCode: 'viis' },
    { index: 56, parkCode: 'voya' },
    { index: 57, parkCode: 'whsa' },
    { index: 58, parkCode: 'wica' },
    { index: 59, parkCode: 'wrst' },
    { index: 60, parkCode: 'yell' },
    { index: 61, parkCode: 'yose' },
    { index: 62, parkCode: 'zion' },
];

function fetchJSON(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try { resolve(JSON.parse(data)); }
                catch (e) { reject(e); }
            });
        }).on('error', reject);
    });
}

function downloadFile(url, dest) {
    return new Promise((resolve, reject) => {
        const makeRequest = (requestUrl) => {
            const mod = requestUrl.startsWith('https') ? https : require('http');
            mod.get(requestUrl, (res) => {
                if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                    makeRequest(res.headers.location);
                    return;
                }
                if (res.statusCode !== 200) {
                    reject(new Error(`HTTP ${res.statusCode} for ${requestUrl}`));
                    return;
                }
                const file = fs.createWriteStream(dest);
                res.pipe(file);
                file.on('finish', () => { file.close(); resolve(); });
            }).on('error', reject);
        };
        makeRequest(url);
    });
}

async function main() {
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Get unique park codes
    const uniqueCodes = [...new Set(parks.map(p => p.parkCode))];
    const codesParam = uniqueCodes.join(',');

    console.log(`Fetching data for ${uniqueCodes.length} park codes...`);
    const apiUrl = `https://developer.nps.gov/api/v1/parks?parkCode=${codesParam}&limit=100&api_key=${API_KEY}`;
    const response = await fetchJSON(apiUrl);

    // Build a map of parkCode -> images array
    const imageMap = {};
    for (const park of response.data) {
        imageMap[park.parkCode] = park.images || [];
    }

    console.log(`Got image data for ${Object.keys(imageMap).length} parks. Downloading...`);

    let downloaded = 0;
    let failed = 0;

    for (const park of parks) {
        const dest = path.join(OUTPUT_DIR, `${park.index}.jpg`);

        // Skip if already downloaded
        if (fs.existsSync(dest)) {
            console.log(`  [skip] ${park.index}.jpg already exists`);
            downloaded++;
            continue;
        }

        const images = imageMap[park.parkCode];
        const imgIndex = park.imageIndex || 0;

        if (!images || images.length === 0) {
            console.log(`  [warn] No images for ${park.parkCode} (index ${park.index})`);
            failed++;
            continue;
        }

        const imgUrl = images[Math.min(imgIndex, images.length - 1)].url;

        try {
            await downloadFile(imgUrl, dest);
            console.log(`  [ok] ${park.index}.jpg (${park.parkCode})`);
            downloaded++;
        } catch (err) {
            console.log(`  [err] ${park.index}.jpg (${park.parkCode}): ${err.message}`);
            failed++;
        }
    }

    console.log(`\nDone! Downloaded: ${downloaded}, Failed: ${failed}`);
}

main().catch(console.error);
