import { useState } from "react";
import axios from "axios";

const USER_ID = "6c366c78-badf-4c60-828a-db58f2467797";

export default function FavoriteButton({ jobId, initialIsFavorite = false, className = ""  }) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    setLoading(true);
    try {
      await axios.post("http://localhost:4000/api/favorites/toggle", {
        userId: USER_ID,
        jobId,
      });
      setIsFavorite(prev => !prev);
    } catch (err) {
      console.error("Erro ao atualizar favorito:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={loading}
      className={`absolute bottom-3 right-3 md:top-3 md:bottom-auto md:right-3 font-semibold px-3 py-2 rounded-3xl cursor-pointer
      ${isFavorite ? "bg-amber-600 text-white" : "bg-gray-100 text-gray-800"}
      ${loading ? "opacity-50 cursor-not-allowed" : ""}
      ${className}`}
    >
      {loading ? "Carregando..." : isFavorite ? "★ Favorito" : "★ Favoritar"}
    </button>
  );
}
