import {Router} from "express";
import {handleGuess, newGame} from "./game.controller.js";

const router = Router();

router.post("/new", newGame);
router.post("/guess", handleGuess);

export default router;