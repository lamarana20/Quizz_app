import React, { useEffect, useState, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  Popup,
} from "react-leaflet";
import L from "leaflet";

// Correction pour icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
});

// 👇 Composant interne pour centrer dynamiquement la carte
function RecenterMap({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.setView(position);
    }
  }, [position, map]);
  return null;
}

export default function LiveTracker() {
  const [position, setPosition] = useState(null);
  const watchId = useRef(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      watchId.current = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setPosition([latitude, longitude]);
        },
        (err) => {
          console.error("Erreur de géolocalisation :", err);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000,
        }
      );
    }

    return () => {
      // Nettoyer l'écouteur quand le composant est démonté
      if (watchId.current) {
        navigator.geolocation.clearWatch(watchId.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-screen">
      {position ? (
        <MapContainer
          center={position}
          zoom={16}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>🚶 Tu es ici (en direct)</Popup>
          </Marker>
          <RecenterMap position={position} />
        </MapContainer>
      ) : (
        <p className="text-center mt-10">📡 En attente de la position...</p>
      )}
    </div>
  );
}
