import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import jobsRoutes from "./routes/jobs.routes.js";
import favoritesRoutes from "./routes/favorites.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobsRoutes);
app.use("/api/favorites", favoritesRoutes);

export default app;
