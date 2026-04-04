// Load saved visited state from localStorage
const loadVisited = () => {
    try {
        const saved = localStorage.getItem('nps-visited');
        if (!saved) return {};
        const parsed = JSON.parse(saved);
        // Handle both old format (true) and new format ({ visitDate })
        const normalized = {};
        for (const [key, val] of Object.entries(parsed)) {
            if (val === true) {
                normalized[key] = { visitDate: null };
            } else if (typeof val === 'object' && val !== null) {
                normalized[key] = val;
            }
        }
        return normalized;
    } catch {
        return {};
    }
};

const savedVisited = loadVisited();

var ParksList = [
    { name: 'Acadia', parkCode: 'acad', lat: 44.35, lng: -68.21, visited: false, visitDate: null, color: '#477362', index: 0 },
    { name: 'American Samoa', parkCode: 'npsa', lat: -14.25, lng: -170.68, visited: false, visitDate: null, color: '#1c97a7', index: 1 },
    { name: 'Arches', parkCode: 'arch', lat: 38.68, lng: -109.57, visited: false, visitDate: null, color: '#c35733', index: 2 },
    { name: 'Badlands', parkCode: 'badl', lat: 43.75, lng: -102.50, visited: false, visitDate: null, color: '#c19e7a', index: 3 },
    { name: 'Big Bend', parkCode: 'bibe', lat: 29.25, lng: -103.25, visited: false, visitDate: null, color: '#d8b18c', index: 4 },
    { name: 'Biscayne', parkCode: 'bisc', lat: 25.65, lng: -80.08, visited: false, visitDate: null, color: '#4c9499', index: 5 },
    { name: 'Black Canyon of the Gunnison', parkCode: 'blca', lat: 38.57, lng: -107.72, visited: false, visitDate: null, color: '#b4a293', index: 6 },
    { name: 'Bryce Canyon', parkCode: 'brca', lat: 37.57, lng: -112.18, visited: false, visitDate: null, color: '#e5773f', index: 7 },
    { name: 'Canyonlands', parkCode: 'cany', lat: 38.2, lng: -109.93, visited: false, visitDate: null, color: '#a05b42', index: 8 },
    { name: 'Capitol Reef', parkCode: 'care', lat: 38.20, lng: -111.17, visited: false, visitDate: null, color: '#c44c2a', index: 9 },
    { name: 'Carlsbad Caverns', parkCode: 'cave', lat: 32.17, lng: -104.44, visited: false, visitDate: null, color: '#d9bda2', index: 10 },
    { name: 'Channel Islands', parkCode: 'chis', lat: 34.01, lng: -119.42, visited: false, visitDate: null, color: '#045a67', index: 11 },
    { name: 'Congaree', parkCode: 'cong', lat: 33.78, lng: -80.78, visited: false, visitDate: null, color: '#815733', index: 12 },
    { name: 'Crater Lake', parkCode: 'crla', lat: 42.94, lng: -122.1, visited: false, visitDate: null, color: '#155e8f', index: 13 },
    { name: 'Cuyahoga Valley', parkCode: 'cuva', lat: 41.24, lng: -81.55, visited: false, visitDate: null, color: '#e2af50', index: 14 },
    { name: 'Death Valley', parkCode: 'deva', lat: 36.24, lng: -116.82, visited: false, visitDate: null, color: '#e6c1a7', index: 15 },
    { name: 'Denali', parkCode: 'dena', lat: 63.33, lng: -150.50, visited: false, visitDate: null, color: '#cbc9d4', index: 16 },
    { name: 'Dry Tortugas', parkCode: 'drto', lat: 24.63, lng: -82.87, visited: false, visitDate: null, color: '#49b39c', index: 17 },
    { name: 'Everglades', parkCode: 'ever', lat: 25.32, lng: -80.93, visited: false, visitDate: null, color: '#a7a556', index: 18 },
    { name: 'Gates of the Arctic', parkCode: 'gaar', lat: 67.78, lng: -153.30, visited: false, visitDate: null, color: '#7b7977', index: 19 },
    { name: 'Gateway Arch', parkCode: 'jeff', lat: 38.63, lng: -90.19, visited: false, visitDate: null, color: '#b5b1ab', index: 20 },
    { name: 'Glacier', parkCode: 'glac', lat: 48.80, lng: -114.00, visited: false, visitDate: null, color: '#34b2b0', index: 21 },
    { name: 'Glacier Bay', parkCode: 'glba', lat: 58.50, lng: -137.00, visited: false, visitDate: null, color: '#aedcf1', index: 22 },
    { name: 'Grand Canyon', parkCode: 'grca', lat: 36.06, lng: -112.14, visited: false, visitDate: null, color: '#db744b', index: 23 },
    { name: 'Grand Teton', parkCode: 'grte', lat: 43.73, lng: -110.80, visited: false, visitDate: null, color: '#a8d0ce', index: 24 },
    { name: 'Great Basin', parkCode: 'grba', lat: 38.98, lng: -114.30, visited: false, visitDate: null, color: '#938787', index: 25 },
    { name: 'Great Sand Dunes', parkCode: 'grsa', lat: 37.73, lng: -105.51, visited: false, visitDate: null, color: '#cbb18e', index: 26 },
    { name: 'Great Smoky Mountains', parkCode: 'grsm', lat: 35.68, lng: -83.53, visited: false, visitDate: null, color: '#4378a6', index: 27 },
    { name: 'Guadalupe Mountains', parkCode: 'gumo', lat: 31.92, lng: -104.87, visited: false, visitDate: null, color: '#b6a9a5', index: 28 },
    { name: 'Haleakalā', parkCode: 'hale', lat: 20.72, lng: -156.17, visited: false, visitDate: null, color: '#aa6b82', index: 29 },
    { name: 'Hawaiʻi Volcanoes', parkCode: 'havo', lat: 19.38, lng: -155.20, visited: false, visitDate: null, color: '#dd4e33', index: 30 },
    { name: 'Hot Springs', parkCode: 'hosp', lat: 34.51, lng: -93.05, visited: false, visitDate: null, color: '#90a786', index: 31 },
    { name: 'Indiana Dunes', parkCode: 'indu', lat: 41.6533, lng: -87.0524, visited: false, visitDate: null, color: '#dec8b2', index: 32 },
    { name: 'Isle Royale', parkCode: 'isro', lat: 48.10, lng: -88.55, visited: false, visitDate: null, color: '#02553d', index: 33 },
    { name: 'Joshua Tree', parkCode: 'jotr', lat: 33.79, lng: -115.90, visited: false, visitDate: null, color: '#ccb486', index: 34 },
    { name: 'Katmai', parkCode: 'katm', lat: 58.50, lng: -155.00, visited: false, visitDate: null, color: '#424d24', index: 35 },
    { name: 'Kenai Fjords', parkCode: 'kefj', lat: 59.92, lng: -149.65, visited: false, visitDate: null, color: '#cbdfe6', index: 36 },
    { name: 'Kings Canyon', parkCode: 'seki', lat: 36.80, lng: -118.55, visited: false, visitDate: null, color: '#515d31', index: 37 },
    { name: 'Kobuk Valley', parkCode: 'kova', lat: 67.55, lng: -159.28, visited: false, visitDate: null, color: '#ccc3b1', index: 38 },
    { name: 'Lake Clark', parkCode: 'lacl', lat: 60.97, lng: -153.42, visited: false, visitDate: null, color: '#3289a5', index: 39 },
    { name: 'Lassen Volcanic', parkCode: 'lavo', lat: 40.49, lng: -121.51, visited: false, visitDate: null, color: '#dfd2cb', index: 40 },
    { name: 'Mammoth Cave', parkCode: 'maca', lat: 37.18, lng: -86.10, visited: false, visitDate: null, color: '#7d5d3f', index: 41 },
    { name: 'Mesa Verde', parkCode: 'meve', lat: 37.18, lng: -108.49, visited: false, visitDate: null, color: '#d4be9a', index: 42 },
    { name: 'Mount Rainier', parkCode: 'mora', lat: 46.85, lng: -121.75, visited: false, visitDate: null, color: '#bfc0de', index: 43 },
    { name: 'New River Gorge', parkCode: 'neri', lat: 38.07, lng: -81.08, visited: false, visitDate: null, color: '#41623d', index: 44 },
    { name: 'North Cascades', parkCode: 'noca', lat: 48.70, lng: -121.20, visited: false, visitDate: null, color: '#4e6c32', index: 45 },
    { name: 'Olympic', parkCode: 'olym', lat: 47.97, lng: -123.50, visited: false, visitDate: null, color: '#94b6e8', index: 46 },
    { name: 'Petrified Forest', parkCode: 'pefo', lat: 35.07, lng: -109.78, visited: false, visitDate: null, color: '#bdab8f', index: 47 },
    { name: 'Pinnacles', parkCode: 'pinn', lat: 36.48, lng: -121.16, visited: false, visitDate: null, color: '#a47f6d', index: 48 },
    { name: 'Redwood', parkCode: 'redw', lat: 41.30, lng: -124.00, visited: false, visitDate: null, color: '#92563c', index: 49 },
    { name: 'Rocky Mountain', parkCode: 'romo', lat: 40.40, lng: -105.58, visited: false, visitDate: null, color: '#848693', index: 50 },
    { name: 'Saguaro', parkCode: 'sagu', lat: 32.25, lng: -110.50, visited: false, visitDate: null, color: '#9c8644', index: 51 },
    { name: 'Sequoia', parkCode: 'seki', lat: 36.43, lng: -118.68, visited: false, visitDate: null, color: '#964320', index: 52 },
    { name: 'Shenandoah', parkCode: 'shen', lat: 38.53, lng: -78.35, visited: false, visitDate: null, color: '#4a6e30', index: 53 },
    { name: 'Theodore Roosevelt', parkCode: 'thro', lat: 46.97, lng: -103.45, visited: false, visitDate: null, color: '#ac9931', index: 54 },
    { name: 'Virgin Islands', parkCode: 'viis', lat: 18.33, lng: -64.73, visited: false, visitDate: null, color: '#05a3b9', index: 55 },
    { name: 'Voyageurs', parkCode: 'voya', lat: 48.50, lng: -92.88, visited: false, visitDate: null, color: '#004e76', index: 56 },
    { name: 'White Sands', parkCode: 'whsa', lat: 32.78, lng: -106.17, visited: false, visitDate: null, color: '#e0dad6', index: 57 },
    { name: 'Wind Cave', parkCode: 'wica', lat: 43.57, lng: -103.48, visited: false, visitDate: null, color: '#ae7f6a', index: 58 },
    { name: 'Wrangell–St. Elias', parkCode: 'wrst', lat: 61.00, lng: -142.00, visited: false, visitDate: null, color: '#b9dddf', index: 59 },
    { name: 'Yellowstone', parkCode: 'yell', lat: 44.60, lng: -110.50, visited: false, visitDate: null, color: '#e78524', index: 60 },
    { name: 'Yosemite', parkCode: 'yose', lat: 37.83, lng: -119.50, visited: false, visitDate: null, color: '#beafab', index: 61 },
    { name: 'Zion', parkCode: 'zion', lat: 37.30, lng: -113.05, visited: false, visitDate: null, color: '#e4825a', index: 62 },
];

// Apply saved visited state
ParksList.forEach(park => {
    const saved = savedVisited[park.index];
    if (saved) {
        park.visited = true;
        park.visitDate = saved.visitDate || null;
    }
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <>
                    {children}
                </>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const countVisitedParks = (parks) => {
    return parks.filter(p => p.visited).length;
};

const setVisited = (index, setData) => {
    setData(prev => {
        const newData = [...prev];
        const wasVisited = newData[index].visited;
        newData[index] = {
            ...newData[index],
            visited: !wasVisited,
            visitDate: wasVisited ? null : newData[index].visitDate,
        };
        return newData;
    });
};

const setVisitDate = (index, visitDate, setData) => {
    setData(prev => {
        const newData = [...prev];
        newData[index] = { ...newData[index], visitDate };
        return newData;
    });
};

const saveVisited = (data) => {
    const visitedMap = {};
    data.forEach(park => {
        if (park.visited) {
            visitedMap[park.index] = { visitDate: park.visitDate || null };
        }
    });
    localStorage.setItem('nps-visited', JSON.stringify(visitedMap));
};

const formatVisitDate = (visitDate) => {
    if (!visitDate) return null;
    const [year, month] = visitDate.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month, 10) - 1]} ${year}`;
};

export {
    ParksList,
    TabPanel,
    a11yProps,
    countVisitedParks,
    setVisited,
    setVisitDate,
    saveVisited,
    formatVisitDate
}