import { getAllJobs, getJobById } from "../services/jobs.service.js";

/**
 * Retorna todas as vagas com paginação.
 * GET /api/jobs?page=1&limit=10
 */
export const getJobs = async (req, res) => {
  try {
    
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const jobs = await getAllJobs();

    
    const start = (page - 1) * limit;
    const end = start + limit;

    
    const jobsPage = jobs.slice(start, end);

    
    res.json({
      jobs: jobsPage,
      page,
      totalPages: Math.ceil(jobs.length / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar vagas" });
  }
};

/**
 * Busca vagas pelo título ou nome da empresa.
 * GET /api/jobs/search?query=designer&page=1&limit=10
 */
export const searchJobs = async (req, res) => {
  try {
    const { query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({ error: "Parâmetro 'query' é obrigatório" });
    }

    const allJobs = await getAllJobs();

    const filteredJobs = allJobs.filter(job =>
      job.title.toLowerCase().includes(query.toLowerCase()) ||
      (job.company_name && job.company_name.toLowerCase().includes(query.toLowerCase()))
    );

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;
    const paginatedJobs = filteredJobs.slice(start, end);

    res.json({
      jobs: paginatedJobs,
      page: pageNum,
      totalPages: Math.ceil(filteredJobs.length / limitNum),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar vagas" });
  }
};

/**
 * Retorna uma vaga específica pelo ID.
 * GET /api/jobs/:id
 */
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

/**
 * Filtra vagas por categoria com paginação.
 * GET /api/jobs/filter?category=design&page=1&limit=10
 */
export const filterJobsByCategory = async (req, res) => {
  try {
    const { category, page = 1, limit = 10 } = req.query;

    if (!category) {
      return res.status(400).json({ error: "Parâmetro 'category' é obrigatório" });
    }

    const allJobs = await getAllJobs();

    const filteredJobs = allJobs.filter(
      job => String(job.category).toLowerCase() === String(category).toLowerCase()
    );

    const pageNum = Number(page);
    const limitNum = Number(limit);

    const start = (pageNum - 1) * limitNum;
    const end = start + limitNum;

    const paginatedJobs = filteredJobs.slice(start, end);

    res.json({
      jobs: paginatedJobs,
      page: pageNum,
      totalPages: Math.ceil(filteredJobs.length / limitNum),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao filtrar vagas por categoria" });
  }
};