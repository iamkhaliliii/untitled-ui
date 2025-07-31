import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Create custom primary color marker icon
const createCustomIcon = () => {
  return L.divIcon({
    className: 'custom-location-marker',
    html: `
      <svg width="36" height="36" viewBox="0 0 24 24" fill="rgb(127 86 217)" style="filter: drop-shadow(0 3px 6px rgba(0,0,0,0.25));">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 36],
    popupAnchor: [0, -36]
  });
};

interface EventMapProps {
  location: string;
  latitude?: number;
  longitude?: number;
  className?: string;
}

const EventMap: React.FC<EventMapProps> = ({ 
  location, 
  latitude = 40.7128, // Default to NYC coordinates
  longitude = -74.0060,
  className = ""
}) => {
  const position: [number, number] = useMemo(() => [latitude, longitude], [latitude, longitude]);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .minimal-popup .leaflet-popup-content-wrapper {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            border: none;
            padding: 0;
          }
          .minimal-popup .leaflet-popup-content {
            margin: 8px 12px;
            line-height: 1.2;
          }
          .minimal-popup .leaflet-popup-tip {
            background: rgba(255, 255, 255, 0.95);
            border: none;
            box-shadow: none;
          }
        `
      }} />
      
      <div className={`w-full h-48 rounded-lg overflow-hidden border-0 bg-gray-50 ${className}`}>
        <MapContainer
          center={position}
          zoom={16}
          style={{ width: "100%", height: "100%" }}
          zoomControl={false}
          scrollWheelZoom={false}
          dragging={false}
          touchZoom={false}
          doubleClickZoom={false}
          boxZoom={false}
          keyboard={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution=""
          />
          <Marker position={position} icon={createCustomIcon()}>
            <Popup closeButton={false} className="minimal-popup">
              <div className="text-xs text-gray-700 font-medium">
                {location}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </>
  );
};

export default EventMap;