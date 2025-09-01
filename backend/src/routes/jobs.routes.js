import express from "express";
import { getJobs, getJob, filterJobsByCategory, searchJobs } from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs); // /api/jobs
router.get("/filter", filterJobsByCategory); // /api/jobs/filter?category=design
router.get("/search", searchJobs); // /api/jobs/search?query=designer
router.get("/:id", getJob); // /api/jobs/:id

export default router;