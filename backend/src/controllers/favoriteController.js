import supabase from "../supabaseClient.js";

/**
 * Retorna todos os favoritos de um usuário.
 * GET /api/favorites/user/:userId
 */
export async function handleGetAllFavorites(req, res) {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("job_id")
      .eq("user_id", userId);

    if (error) throw error;

    res.json(data || []);
  } catch (err) {
    console.error("Erro ao buscar favoritos:", err.message);
    res.status(500).json({ error: err.message });
  }
}

/**
 * Retorna se uma vaga específica está favoritada por um usuário.
 * GET /api/favorites/status/:userId/:jobId
 */
export const handleGetFavoriteStatus = async (req, res) => {
  const { userId, jobId } = req.params;

  try {
    const { data, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId)
      .eq("job_id", jobId)
      .single();

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    res.json({ favorited: !!data });
  } catch (err) {
    console.error("Erro ao buscar status do favorito:", err.message);
    res.status(500).json({ error: "Erro ao buscar status do favorito" });
  }
};

/**
 * Alterna o status de favorito de uma vaga para um usuário.
 * POST /api/favorites/toggle
 * { userId, jobId }
 */
export const handleToggleFavorite = async (req, res) => {
  const { userId, jobId } = req.body;

  try {
    const { data: existing, error } = await supabase
      .from("favorites")
      .select("*")
      .eq("user_id", userId)
      .eq("job_id", jobId)
      .single();

    if (error && error.code !== "PGRST116") throw error;

    let newFavorited;

    if (existing) {
      await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("job_id", jobId);

      newFavorited = false;
    } else {
      await supabase
        .from("favorites")
        .insert([{ user_id: userId, job_id: jobId }]);

      newFavorited = true;
    }

    res.json({ favorited: newFavorited });
  } catch (err) {
    console.error("Erro ao alternar favorito:", err.message);
    res.status(500).json({ error: "Erro ao alternar favorito" });
  }
};