import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { setVisited } from './Service';

export const NPMap = ({ data, setData }) => {
    return (
        <MapContainer
            center={[39.8, -98.5]}
            zoom={4}
            style={{ height: '75vh', width: '100%' }}
            scrollWheelZoom={true}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            />
            {data.map((park) => (
                <CircleMarker
                    key={park.index}
                    center={[park.lat, park.lng]}
                    radius={8}
                    pathOptions={{
                        fillColor: park.visited ? park.color : '#999',
                        color: park.visited ? park.color : '#666',
                        weight: 2,
                        opacity: 1,
                        fillOpacity: park.visited ? 0.9 : 0.4,
                    }}
                    eventHandlers={{
                        click: () => setVisited(park.index, setData),
                    }}
                >
                    <Popup>
                        <strong>{park.name}</strong>
                        <br />
                        {park.visited ? 'Visited!' : 'Not yet visited'}
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
};