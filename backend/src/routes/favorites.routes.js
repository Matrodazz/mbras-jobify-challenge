import express from "express";
import { handleGetFavoriteStatus, handleToggleFavorite, handleGetAllFavorites } from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/user/:userId", handleGetAllFavorites); 

router.get("/:userId/:jobId", handleGetFavoriteStatus); 

router.post("/toggle", handleToggleFavorite);

export default router;
