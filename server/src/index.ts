import express from "express";
import gameRoutes from "./api/game/game.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use("/api/game", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
