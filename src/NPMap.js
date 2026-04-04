import { MapContainer, TileLayer, CircleMarker, Tooltip } from 'react-leaflet';
import { setVisited, formatVisitDate } from './Service';

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
            {data.map((park) => {
                const dateLabel = park.visited && park.visitDate
                    ? ` — ${formatVisitDate(park.visitDate)}`
                    : park.visited ? ' — Visited!' : '';
                return (
                    <CircleMarker
                        key={park.index}
                        center={[park.lat, park.lng]}
                        radius={10}
                        pathOptions={{
                            fillColor: park.visited ? park.color : '#bbb',
                            color: park.visited ? park.color : '#888',
                            weight: 2,
                            opacity: 1,
                            fillOpacity: park.visited ? 0.9 : 0.3,
                        }}
                        eventHandlers={{
                            click: () => setVisited(park.index, setData),
                        }}
                    >
                        <Tooltip direction="top" offset={[0, -8]}>
                            <strong>{park.name}</strong>{dateLabel}
                        </Tooltip>
                    </CircleMarker>
                );
            })}
        </MapContainer>
    );
};