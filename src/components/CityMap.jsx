import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const RecenterMap = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    map.setView(center, 11);
  }, [center, map]);

  return null;
};

const CityMap = ({ lat, lon, cityName, country }) => {
  if (lat == null || lon == null) return null;

  const position = [lat, lon];

  return (
    <div className="map-panel">
      <h2 className="map-heading">City Location</h2>

      <MapContainer
        center={position}
        zoom={11}
        scrollWheelZoom={true}
        className="city-map"
      >
        <RecenterMap center={position} />

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            {cityName}
            {country ? `, ${country}` : ""}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default CityMap;
