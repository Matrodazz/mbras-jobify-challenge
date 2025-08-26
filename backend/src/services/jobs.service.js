import axios from "axios";

const API_URL = "https://remotive.com/api/remote-jobs";

export const getAllJobs = async () => {
  const response = await axios.get(API_URL);
  return response.data.jobs;
};

export const getJobById = async (id) => {
  const allJobs = await getAllJobs();
  return allJobs.find(job => String(job.id) === String(id));
};

