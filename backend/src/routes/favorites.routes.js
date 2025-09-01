import express from "express";
import { handleGetFavoriteStatus, handleToggleFavorite, handleGetAllFavorites } from "../controllers/favoriteController.js";

const router = express.Router();

router.get("/user/:userId", handleGetAllFavorites); // /api/user/6c366c78-badf-4c60-828a-db58f2467797
router.get("/:userId/:jobId", handleGetFavoriteStatus);// /api/user/6c366c78-badf-4c60-828a-db58f2467797/35324
router.post("/toggle", handleToggleFavorite);

export default router;
