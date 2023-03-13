import { Router } from "express";
import passport from "passport";
import {
  createAuthor,
  getAllAuthors,
  getASingleAuthor,
  getCurrentAuthor,
  loginAuthor,
} from "../controllers/author";

const router = Router();

router.post("/login", loginAuthor);
router.post("/create", createAuthor);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  getAllAuthors
);
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }),
  getCurrentAuthor
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getASingleAuthor
);

module.exports = router;
