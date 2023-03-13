import { Router } from "express";
import passport from "passport";
import {
  createABook,
  getPaginatedBooks,
  likeABook,
  unlikeABook,
} from "../controllers/books";

const router = Router();

router.post(
  "/create",
  passport.authenticate("jwt", { session: false }),
  createABook
);

router.put(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  likeABook
);

router.put(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  unlikeABook
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  getPaginatedBooks
);

module.exports = router;
