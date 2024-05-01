import { Router } from "express";
import { upload } from "../lib/storage.js";
import { logout, signIn, signUp, status } from "../controllers/auth-route.js";
import passport from "passport";
import validateSignUpForm from "../dto/user-dto-schema.js";
const router = Router();

router.post(
  "/sign-up",
  [upload.single("profilePic"), validateSignUpForm],
  signUp
);
router.post("/sign-in", passport.authenticate("local"), signIn);
router.delete("/logout", logout);
router.get("/status", status);

export default router;
