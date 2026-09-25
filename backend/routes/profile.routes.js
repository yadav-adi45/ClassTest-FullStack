import express from "express"
import { createProfile, getProfiles, getProfile, updateProfile } from "../controller/profile.controller.js";


const router = express.Router();


router.post("/api/profiles", createProfile);
router.get("/api/profiles", getProfiles);
router.get("/api/profiles/:id", getProfile);
router.put("/api/profiles/:id", updateProfile);

export default router;