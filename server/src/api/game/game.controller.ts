import type { RequestHandler } from "express";

export const handleGuess: RequestHandler = (req, res) => {
  console.log(req.body);
  res.json({received: req.body});
};