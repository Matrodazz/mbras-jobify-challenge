import { getAllJobs, getJobById } from "../services/jobs.service.js";

export const getJobs = async (req, res) => {
  try {
    const jobs = await getAllJobs();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar vagas" });
  }
};

export const getJob = async (req, res) => {
  try {
    const { id } = req.params;
    const job = await getJobById(id);

    if (!job) {
      return res.status(404).json({ message: "Vaga não encontrada" });
    }

    return res.json(job);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Erro ao buscar vaga" });
  }
};

export const filterJobsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Parâmetro 'category' é obrigatório" });
    }

    const jobs = await getAllJobs();

    const filteredJobs = jobs.filter(
      job => String(job.category).toLowerCase() === String(category).toLowerCase()
    );

    res.json(filteredJobs);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Erro ao filtrar vagas por categoria" });
  }
};