import supabase from "../supabaseClient.js";

// Verifica se um job específico está favoritado por um usuário.
export const getFavoriteStatus = async (userId, jobId) => {
  const { data, error } = await supabase
    .from("favorites")
    .select("*")
    .eq("user_id", userId)
    .eq("job_id", jobId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return !!data;
};

// Alterna o status de favorito de um job para um usuário.
export const toggleFavorite = async (userId, jobId) => {
  const isFavorited = await getFavoriteStatus(userId, jobId);

  if (isFavorited) {
    const { error } = await supabase
      .from("favorites")
      .delete()
      .eq("user_id", userId)
      .eq("job_id", jobId);

    if (error) throw error;
    return false;
  } else {
    const { error } = await supabase
      .from("favorites")
      .insert([{ user_id: userId, job_id: jobId }]);

    if (error) throw error;
    return true;
  }
};
