import type { RequestHandler } from "express";
import * as gameService from "./game.service.js";

type GuessBody = {
    guess: string;
}

// #region Controllers
export const newGame: RequestHandler = (req, res) => {
    const game = gameService.createGame();
    return res.json(game);
};

export const handleGuess: RequestHandler<{}, any, GuessBody> = (req, res) => {
    const { guess } = req.body;
    const result = gameService.processResult(guess);
    return res.json(result);
};

// #endregion