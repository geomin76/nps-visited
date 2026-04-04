// Load saved visited state from localStorage
const loadVisited = () => {
    try {
        const saved = localStorage.getItem('nps-visited');
        return saved ? JSON.parse(saved) : {};
    } catch {
        return {};
    }
};

const savedVisited = loadVisited();

var ParksList = [
    { name: 'Acadia', lat: 44.35, lng: -68.21, visited: false, color: '#477362', index: 0 },
    { name: 'American Samoa', lat: -14.25, lng: -170.68, visited: false, color: '#1c97a7', index: 1 },
    { name: 'Arches', lat: 38.68, lng: -109.57, visited: false, color: '#c35733', index: 2 },
    { name: 'Badlands', lat: 43.75, lng: -102.50, visited: false, color: '#c19e7a', index: 3 },
    { name: 'Big Bend', lat: 29.25, lng: -103.25, visited: false, color: '#d8b18c', index: 4 },
    { name: 'Biscayne', lat: 25.65, lng: -80.08, visited: false, color: '#4c9499', index: 5 },
    { name: 'Black Canyon of the Gunnison', lat: 38.57, lng: -107.72, visited: false, color: '#b4a293', index: 6 },
    { name: 'Bryce Canyon', lat: 37.57, lng: -112.18, visited: false, color: '#e5773f', index: 7 },
    { name: 'Canyonlands', lat: 38.2, lng: -109.93, visited: false, color: '#a05b42', index: 8 },
    { name: 'Capitol Reef', lat: 38.20, lng: -111.17, visited: false, color: '#c44c2a', index: 9 },
    { name: 'Carlsbad Caverns', lat: 32.17, lng: -104.44, visited: false, color: '#d9bda2', index: 10 },
    { name: 'Channel Islands', lat: 34.01, lng: -119.42, visited: false, color: '#045a67', index: 11 },
    { name: 'Congaree', lat: 33.78, lng: -80.78, visited: false, color: '#815733', index: 12 },
    { name: 'Crater Lake', lat: 42.94, lng: -122.1, visited: false, color: '#155e8f', index: 13 },
    { name: 'Cuyahoga Valley', lat: 41.24, lng: -81.55, visited: false, color: '#e2af50', index: 14 },
    { name: 'Death Valley', lat: 36.24, lng: -116.82, visited: false, color: '#e6c1a7', index: 15 },
    { name: 'Denali', lat: 63.33, lng: -150.50, visited: false, color: '#cbc9d4', index: 16 },
    { name: 'Dry Tortugas', lat: 24.63, lng: -82.87, visited: false, color: '#49b39c', index: 17 },
    { name: 'Everglades', lat: 25.32, lng: -80.93, visited: false, color: '#a7a556', index: 18 },
    { name: 'Gates of the Arctic', lat: 67.78, lng: -153.30, visited: false, color: '#7b7977', index: 19 },
    { name: 'Gateway Arch', lat: 38.63, lng: -90.19, visited: false, color: '#b5b1ab', index: 20 },
    { name: 'Glacier', lat: 48.80, lng: -114.00, visited: false, color: '#34b2b0', index: 21 },
    { name: 'Glacier Bay', lat: 58.50, lng: -137.00, visited: false, color: '#aedcf1', index: 22 },
    { name: 'Grand Canyon', lat: 36.06, lng: -112.14, visited: false, color: '#db744b', index: 23 },
    { name: 'Grand Teton', lat: 43.73, lng: -110.80, visited: false, color: '#a8d0ce', index: 24 },
    { name: 'Great Basin', lat: 38.98, lng: -114.30, visited: false, color: '#938787', index: 25 },
    { name: 'Great Sand Dunes', lat: 37.73, lng: -105.51, visited: false, color: '#cbb18e', index: 26 },
    { name: 'Great Smoky Mountains', lat: 35.68, lng: -83.53, visited: false, color: '#4378a6', index: 27 },
    { name: 'Guadalupe Mountains', lat: 31.92, lng: -104.87, visited: false, color: '#b6a9a5', index: 28 },
    { name: 'Haleakalā', lat: 20.72, lng: -156.17, visited: false, color: '#aa6b82', index: 29 },
    { name: 'Hawaiʻi Volcanoes', lat: 19.38, lng: -155.20, visited: false, color: '#dd4e33', index: 30 },
    { name: 'Hot Springs', lat: 34.51, lng: -93.05, visited: false, color: '#90a786', index: 31 },
    { name: 'Indiana Dunes', lat: 41.6533, lng: -87.0524, visited: false, color: '#dec8b2', index: 32 },
    { name: 'Isle Royale', lat: 48.10, lng: -88.55, visited: false, color: '#02553d', index: 33 },
    { name: 'Joshua Tree', lat: 33.79, lng: -115.90, visited: false, color: '#ccb486', index: 34 },
    { name: 'Katmai', lat: 58.50, lng: -155.00, visited: false, color: '#424d24', index: 35 },
    { name: 'Kenai Fjords', lat: 59.92, lng: -149.65, visited: false, color: '#cbdfe6', index: 36 },
    { name: 'Kings Canyon', lat: 36.80, lng: -118.55, visited: false, color: '#515d31', index: 37 },
    { name: 'Kobuk Valley', lat: 67.55, lng: -159.28, visited: false, color: '#ccc3b1', index: 38 },
    { name: 'Lake Clark', lat: 60.97, lng: -153.42, visited: false, color: '#3289a5', index: 39 },
    { name: 'Lassen Volcanic', lat: 40.49, lng: -121.51, visited: false, color: '#dfd2cb', index: 40 },
    { name: 'Mammoth Cave', lat: 37.18, lng: -86.10, visited: false, color: '#7d5d3f', index: 41 },
    { name: 'Mesa Verde', lat: 37.18, lng: -108.49, visited: false, color: '#d4be9a', index: 42 },
    { name: 'Mount Rainier', lat: 46.85, lng: -121.75, visited: false, color: '#bfc0de', index: 43 },
    { name: 'New River Gorge', lat: 38.07, lng: -81.08, visited: false, color: '#41623d', index: 44 },
    { name: 'North Cascades', lat: 48.70, lng: -121.20, visited: false, color: '#4e6c32', index: 45 },
    { name: 'Olympic', lat: 47.97, lng: -123.50, visited: false, color: '#94b6e8', index: 46 },
    { name: 'Petrified Forest', lat: 35.07, lng: -109.78, visited: false, color: '#bdab8f', index: 47 },
    { name: 'Pinnacles', lat: 36.48, lng: -121.16, visited: false, color: '#a47f6d', index: 48 },
    { name: 'Redwood', lat: 41.30, lng: -124.00, visited: false, color: '#92563c', index: 49 },
    { name: 'Rocky Mountain', lat: 40.40, lng: -105.58, visited: false, color: '#848693', index: 50 },
    { name: 'Saguaro', lat: 32.25, lng: -110.50, visited: false, color: '#9c8644', index: 51 },
    { name: 'Sequoia', lat: 36.43, lng: -118.68, visited: false, color: '#964320', index: 52 },
    { name: 'Shenandoah', lat: 38.53, lng: -78.35, visited: false, color: '#4a6e30', index: 53 },
    { name: 'Theodore Roosevelt', lat: 46.97, lng: -103.45, visited: false, color: '#ac9931', index: 54 },
    { name: 'Virgin Islands', lat: 18.33, lng: -64.73, visited: false, color: '#05a3b9', index: 55 },
    { name: 'Voyageurs', lat: 48.50, lng: -92.88, visited: false, color: '#004e76', index: 56 },
    { name: 'White Sands', lat: 32.78, lng: -106.17, visited: false, color: '#e0dad6', index: 57 },
    { name: 'Wind Cave', lat: 43.57, lng: -103.48, visited: false, color: '#ae7f6a', index: 58 },
    { name: 'Wrangell–St. Elias', lat: 61.00, lng: -142.00, visited: false, color: '#b9dddf', index: 59 },
    { name: 'Yellowstone', lat: 44.60, lng: -110.50, visited: false, color: '#e78524', index: 60 },
    { name: 'Yosemite', lat: 37.83, lng: -119.50, visited: false, color: '#beafab', index: 61 },
    { name: 'Zion', lat: 37.30, lng: -113.05, visited: false, color: '#e4825a', index: 62 },
];

// Apply saved visited state
ParksList.forEach(park => {
    if (savedVisited[park.index]) {
        park.visited = true;
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
        newData[index] = { ...newData[index], visited: !newData[index].visited };
        return newData;
    });
};

const saveVisited = (data) => {
    const visitedMap = {};
    data.forEach(park => {
        if (park.visited) {
            visitedMap[park.index] = true;
        }
    });
    localStorage.setItem('nps-visited', JSON.stringify(visitedMap));
};

export {
    ParksList,
    TabPanel,
    a11yProps,
    countVisitedParks,
    setVisited,
    saveVisited
}