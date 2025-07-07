import { useEffect, useState } from "react";

export default function Localisation() {
  const [position, setPosition] = useState(null);
  const [city, setCity] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        setPosition({ latitude, longitude });

        // Appel à l'API de reverse geocoding
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`
        );
        const data = await response.json();

        // Accès au nom de la ville
        const ville = data.address.city || data.address.town || data.address.village || "Ville inconnue";
        setCity(ville);
      },
      (err) => {
        console.error("Erreur de géolocalisation", err);
      },
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-lg">
      {position ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Votre localisation</h2>
          <div className="bg-gray-50 p-4 rounded-md">
            <p className="text-lg mb-3">
              <span className="text-2xl">📍</span>
              <span className="font-semibold ml-2">Position :</span>
              <span className="ml-2 text-gray-600">{position.latitude.toFixed(4)}, {position.longitude.toFixed(4)}</span>
            </p>
            <p className="text-lg">
              <span className="text-2xl">🏙️</span>
              <span className="font-semibold ml-2">Ville :</span>
              <span className="ml-2 text-gray-600">{city}</span>
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <div className="animate-pulse">
            <p className="text-xl text-gray-600">
              <span className="text-2xl">📡</span>
              <span className="ml-2">Localisation en cours...</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
