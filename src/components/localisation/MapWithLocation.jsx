import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
//npm install leaflet react-leaflet
// Fix icon display issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

const MapWithLocation = () => {
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition([latitude, longitude]);

        try {
          // Reverse geocoding request (OpenStreetMap)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
          );
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();

          const ville =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            "Unknown city";
          setCity(ville);
        } catch (error) {
          console.error("Error fetching location data:", error);
          setCity("Location error");
        }
      },
      (err) => {
        console.error("Geolocation error:", err);
        setCity("Geolocation error");
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  return (
    <div className="w-full h-screen">
      {position ? (
        <>
          <h2 className="text-xl font-semibold p-4">📍 City: {city}</h2>
          <MapContainer
            center={position}
            zoom={13}
            scrollWheelZoom={true}
            className="w-full h-[90%]"
          >
            <TileLayer
              attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
              <Popup>
                You are here: <strong>{city}</strong>
              </Popup>
            </Marker>
          </MapContainer>
        </>
      ) : (
        <p className="text-center mt-10 text-gray-600">📡 Locating...</p>
      )}
    </div>
  );
};

export default MapWithLocation;
