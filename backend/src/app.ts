import express from "express";
import cors from "cors";
import parentRoutes from "./routes/parentRoutes";
import storyRoutes from "./routes/storyRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.send("ParentPal AI backend is running");
});

app.use("/api/parent", parentRoutes);
app.use("/api/story", storyRoutes);

export default app;