import {Router} from "express";
import {handleGuess} from "./game.controller.js";

const router = Router();

router.post("/guess", handleGuess);

export default router;