import express from "express";
import gameRoutes from "./api/game/game.routes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({ message: "Hello from the server!" });
});

app.use("/api/game", gameRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
