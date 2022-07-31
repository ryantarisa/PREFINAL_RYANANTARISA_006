import express from "express";
import {
  getUser,
  updateUser,
  verifyUser,
} from "../Controllers/UserController.js";

const router = express.Router();

router.get("/:id", getUser);
router.patch("/:id", updateUser);
router.get("/verified/:id", verifyUser);

export default router;
